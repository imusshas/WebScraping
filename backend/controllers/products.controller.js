import { ApiResponse } from "../utils/ApiResponse.js";
import { getRyansHomeProduct, getRyansSearchedProduct } from "../utils/ryans.js";
import { getStarTechHomeProducts, getStarTecSearchedProducts } from "../utils/star-tech.js";

export const getHomeProducts = async (_, res) => {
  try {
    const ryansHomeProducts = await getRyansHomeProduct();
    const starTechHomeProducts = await getStarTechHomeProducts();

    res.status(200).json(new ApiResponse(200, { ryans: ryansHomeProducts.data, starTech: starTechHomeProducts.data }))
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message })
  }
}

export const getSearchedProducts = async (req, res) => {
  try {
    const { searchKey } = req.params;
    if (!searchKey) {
      res.status(400).json({ message: "Search key is required" })
      return;
    }
    const ryansSearchedProducts = await getRyansSearchedProduct(searchKey);
    const starTechSearchedProducts = await getStarTecSearchedProducts(searchKey);

    res.status(200).json(new ApiResponse(200, { ryans: ryansSearchedProducts.data, starTech: starTechSearchedProducts.data }))
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message })
  }
}