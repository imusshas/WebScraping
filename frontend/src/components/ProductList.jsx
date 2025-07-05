import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Skeleton from "react-loading-skeleton";
import Product from "./Product";
import { Button } from "../components/ui/Button";

import "react-loading-skeleton/dist/skeleton.css";
import { fetchProducts } from "../utils/actions";
import { Spinner } from "./ui/Spinner";
import { SortIcon } from "./ui/SortIcon";
import { useCompareStorage } from "../hooks/useCompareStorage";
import { useCompare } from "../context/CompareContext";

import "rc-slider/assets/index.css";
import Slider from "rc-slider";

const ProductList = () => {
	const { clearAll } = useCompareStorage();
	const { compareCount, updateCompareCount } = useCompare();
	const navigate = useNavigate();
	const [allProducts, setAllProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [sortAsc, setSortAsc] = useState(true);
	const [stockFilter, setStockFilter] = useState("all");
	const [selectedPriceRange, setSelectedPriceRange] = useState([0, 1000000]); // Default range
	const [productsPerPage, setProductsPerPage] = useState(20);
	const [offsetIndex, setOffsetIndex] = useState(0);
	const sortButtonText = sortAsc ? "Low To High" : "High To Low";

	const fetchedScraperPagesRef = useRef(new Set());

	const { searchKey, currentPage } = useParams();
	const page = Number(currentPage);

	useEffect(() => {
		if (page === 1 && allProducts.length === 0) {
			setLoading(true);
			fetchProducts(searchKey, page)
				.then((response) => {
					setAllProducts(response || []);
					const prices = (response || []).map((p) => p.price).filter((p) => typeof p === "number");

					const min = Math.min(...prices);
					const max = Math.max(...prices);
					setSelectedPriceRange([min, max]);
				})
				.finally(() => {
					setLoading(false);
				});
		} else if (allProducts.length <= 100_000 && !fetchedScraperPagesRef.current.has(page)) {
			fetchProducts(searchKey, page).then((products) => {
				Array.isArray(products) && setAllProducts((prev) => [...prev, ...products]);
				fetchedScraperPagesRef.current.add(page);
			});
		}
	}, [searchKey, page]);

	useEffect(() => {
		if (page > 1) {
			setLoading(true);
			const timeout = setTimeout(() => setLoading(false), 3000);
			return () => clearTimeout(timeout);
		}
	}, [page]);

	const filteredAndSortedProducts = useMemo(() => {
		const paginated = allProducts.slice(offsetIndex, Math.min(allProducts.length, offsetIndex + productsPerPage));
		const filtered = paginated.filter((p) => {
			const isStock = typeof p.price === "number";
			if (stockFilter === "in" && !isStock) return false;
			if (stockFilter === "out" && isStock) return false;

			// Price range filter
			if (isStock) {
				const [min, max] = selectedPriceRange;
				if (p.price < min || p.price > max) return false;
			}

			return true;
		});

		const sorted = [...filtered].sort((a, b) => {
			const isAStock = typeof a.price === "number";
			const isBStock = typeof b.price === "number";

			if (!isAStock && isBStock) return 1;
			if (isAStock && !isBStock) return -1;
			if (!isAStock && !isBStock) return 0;

			return sortAsc ? a.price - b.price : b.price - a.price;
		});

		return sorted;
	}, [allProducts, sortAsc, stockFilter, selectedPriceRange, offsetIndex, productsPerPage]);

	const handlePageChange = (newPage) => {
		setLoading(true);
		if (newPage > page) {
			setOffsetIndex((prev) => prev + productsPerPage);
		} else if (newPage < page) {
			setOffsetIndex((prev) => prev - productsPerPage);
		}
		navigate(`/products/${searchKey}/${newPage}`);
	};

	return (
		<div className="products-container">
			{loading ? (
				<>
					<Spinner />
					<div className="loading-sort-btn">
						<Skeleton className="loading-sort-btn" />
					</div>
					<section className="product-list">
						{Array.from({ length: 50 }).map((_, index) => (
							<div key={index} className="loading-product">
								<Skeleton className="loading-img" />
								<div>
									<Skeleton />
									<Skeleton className="loading-title" />
								</div>
								<Skeleton className="loading-price" />
							</div>
						))}
					</section>
				</>
			) : (
				<>
					<div className="filter-sort">
						<div className="stock-filter">
							<label>
								<input
									type="radio"
									value="all"
									name="all"
									checked={stockFilter === "all"}
									onChange={() => setStockFilter("all")}
								/>{" "}
								All
							</label>
							<label>
								<input
									type="radio"
									value="in"
									name="in stock"
									checked={stockFilter === "in"}
									onChange={() => setStockFilter("in")}
								/>{" "}
								In Stock
							</label>
							<label>
								<input
									type="radio"
									value="out"
									name="out of stock"
									checked={stockFilter === "out"}
									onChange={() => setStockFilter("out")}
								/>{" "}
								Out of Stock
							</label>
						</div>
						<div className="price-filter">
							<p>
								Price Range: {selectedPriceRange[0]}৳ - {selectedPriceRange[1]}৳
							</p>
							<Slider
								range
								min={selectedPriceRange[0]}
								max={selectedPriceRange[1]}
								value={selectedPriceRange}
								onChange={setSelectedPriceRange}
								allowCross={false}
								pushable
								className="price-slider"
							/>
						</div>
						<div className="pagination-filter">
							<p>Show</p>
							<select
								name="products_per_page"
								value={productsPerPage}
								onChange={(e) => {
									setProductsPerPage(Number(e.target.value));
									setLoading(true);
									setTimeout(() => {
										setLoading(false);
									}, 1500);
								}}
							>
								<option value={20} name="twenty_products_per_page">
									20
								</option>
								<option value={30} name="thirty_products_per_page">
									30
								</option>
								<option value={50} name="fifty_products_per_page">
									50
								</option>
							</select>
						</div>
						<Button className="sort-btn" onClick={() => setSortAsc(!sortAsc)}>
							Price: {sortButtonText}
							<SortIcon />
						</Button>
						<Button
							onClick={() => {
								clearAll();
								updateCompareCount();
							}}
							disabled={compareCount === 0}
						>
							Clear Compare
						</Button>
					</div>
					<section className="product-list">
						{filteredAndSortedProducts.length === 0 ? (
							<p>No product left</p>
						) : (
							filteredAndSortedProducts.map((product) => <Product key={product.productDetailsLink} {...product} />)
						)}
					</section>
					<div className="pagination">
						<Button onClick={() => handlePageChange(page - 1)} disabled={page <= 1}>
							Previous
						</Button>
						<Button
							onClick={() => {
								handlePageChange(page + 1);
							}}
							disabled={offsetIndex + productsPerPage >= allProducts.length}
						>
							Next
						</Button>
					</div>
				</>
			)}
		</div>
	);
};

export default ProductList;
