import { ApiResponse } from "../utils/ApiResponse.js";
import { getRyansSearchedProduct } from "../utils/ryans.js";
import { getStarTecSearchedProducts } from "../utils/star-tech.js";



export const getSearchedProducts = async (req, res) => {
  try {
    const { searchKey } = req.params;
    if (!searchKey) {
      res.status(400).json({ message: "Search key is required" })
      return;
    }
    const ryansSearchedProducts = await getRyansSearchedProduct(searchKey);
    const starTechSearchedProducts = await getStarTecSearchedProducts(searchKey);

    const products = [...ryansSearchedProducts.data, ...starTechSearchedProducts.data]

    res.status(200).json(new ApiResponse(200, products))
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message })
  }
}