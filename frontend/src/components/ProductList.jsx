import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, useOutletContext } from "react-router";
import Skeleton from "react-loading-skeleton";
import Product from "./Product";
import { Button } from "../components/ui/Button";

import "react-loading-skeleton/dist/skeleton.css";
import { fetchProducts } from "../utils/actions";
import { Spinner } from "./ui/Spinner";
import { SortIcon } from "./ui/SortIcon";

const ProductList = () => {
	const { setShowLogin } = useOutletContext();
	const navigate = useNavigate();
	const [allProducts, setAllProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [sortAsc, setSortAsc] = useState(true);
	const [stockFilter, setStockFilter] = useState("all");
	const sortButtonText = sortAsc ? "Low To High" : "High To Low";
	const [productsPerPage, setProductsPerPage] = useState(20);

	const { searchKey, currentPage } = useParams();
	const page = Number(currentPage) || 1;

	useEffect(() => {
		setLoading(true);
		const params = new URLSearchParams({ pageSize: 50 });
		fetchProducts(`${searchKey}/${page}?${params.toString()}`).then((response) => {
			setAllProducts(response || []);
			setLoading(false);
		});
	}, [searchKey, page]);

	const paginatedProducts = useMemo(() => {
		const start = (page - 1) * productsPerPage;
		const end = start + productsPerPage;
		const paged = allProducts.slice(start, end);

		const filtered = paged.filter((p) => {
			const isStock = typeof p.price === "number";
			if (stockFilter === "in") return isStock;
			if (stockFilter === "out") return !isStock;
			return true;
		});

		return [...filtered].sort((a, b) => {
			const isAStock = typeof a.price === "number";
			const isBStock = typeof b.price === "number";

			if (!isAStock && isBStock) return 1;
			if (isAStock && !isBStock) return -1;
			if (!isAStock && !isBStock) return 0;

			return sortAsc ? a.price - b.price : b.price - a.price;
		});
	}, [allProducts, page, productsPerPage, sortAsc, stockFilter]);

	const handlePageChange = (newPage) => {
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
			) : paginatedProducts.length === 0 ? (
				<>
					<img src={"/empty-box.jpg"} alt="no products left" className="empty-product-img" />
					<div className="pagination">
						<Button onClick={() => navigate(`/`)}>Go Home</Button>
					</div>
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
						<div className="per-page-select">
							<label>
								Products per page:&nbsp;
								<select
									value={productsPerPage}
									name="products_per_page"
									onChange={(e) => setProductsPerPage(Number(e.target.value))}
								>
									<option value={20} name="20_products_per_page">
										20
									</option>
									<option value={30} name="30_products_per_page">
										30
									</option>
									{allProducts.length >= 50 && (
										<option value={50} name="50_products_per_page">
											50
										</option>
									)}
								</select>
							</label>
						</div>
						<Button className="sort-btn" onClick={() => setSortAsc(!sortAsc)}>
							Price: {sortButtonText}
							<SortIcon />
						</Button>
					</div>
					<section className="product-list">
						{paginatedProducts.map((product) => (
							<Product key={product.productDetailsLink} {...product} setShowLogin={setShowLogin} />
						))}
					</section>
					<div className="pagination">
						<Button onClick={() => handlePageChange(page - 1)} disabled={page <= 1}>
							Previous
						</Button>
						<Button onClick={() => handlePageChange(page + 1)} disabled={page * productsPerPage >= allProducts.length}>
							Next
						</Button>
					</div>
				</>
			)}
		</div>
	);
};

export default ProductList;
