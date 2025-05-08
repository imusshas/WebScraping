import { ApiResponse } from "../utils/ApiResponse.js";
import { getRyansSearchedProduct } from "../utils/ryans.js";
import { getStarTecSearchedProducts } from "../utils/star-tech.js";



export const getSearchedProducts = async (req, res) => {
  try {
    const { searchKey, currentPage } = req.params;
    if (!searchKey) {
      res.status(400).json({ message: "Search key is required" })
      return;
    }
    const ryansSearchedProducts = await getRyansSearchedProduct(searchKey, currentPage);
    const starTechSearchedProducts = await getStarTecSearchedProducts(searchKey, currentPage);

    const products = [...ryansSearchedProducts.data, ...starTechSearchedProducts.data]

    res.status(200).json(new ApiResponse(200, {
      products: products, ryansNext: ryansSearchedProducts.next, starTechNext: starTechSearchedProducts.next
    }))
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message })
  }
}