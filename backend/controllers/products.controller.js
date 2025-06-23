import { ApiResponse } from "../utils/ApiResponse.js";
import { getBinaryLogicSearchedProductDetails, getBinaryLogicSearchedProducts } from "../utils/binary-logic.js";
import { getRyansSearchedProductDetails, getRyansSearchedProducts } from "../utils/ryans.js";
import { getStarTecSearchedProductDetails, getStarTecSearchedProducts } from "../utils/star-tech.js";
import { getTechLandSearchedProductDetails, getTechLandSearchedProducts } from "../utils/tech-land.js";


export const getSearchedProducts = async (req, res) => {
  try {
    const { searchKey, currentPage } = req.params;
    if (!searchKey) {
      res.status(400).json({ message: "Search key is required" })
      return;
    }
    const ryansSearchedProducts = await getRyansSearchedProducts(searchKey, currentPage);
    const starTechSearchedProducts = await getStarTecSearchedProducts(searchKey, currentPage);
    const techLandSearchedProducts = await getTechLandSearchedProducts(searchKey, currentPage);
    const binaryLogicSearchedProducts = await getBinaryLogicSearchedProducts(searchKey, currentPage);

    const products = [...ryansSearchedProducts, ...starTechSearchedProducts, ...techLandSearchedProducts, ...binaryLogicSearchedProducts]

    res.status(200).json(new ApiResponse(200, products))
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message })
  }
}

export const getSearchedProductDetails = async (req, res) => {
  try {
    const { url, company } = req.params;
    if (!url) {
      return res.status(400).json({ message: "Url is required" })
    }

    if (!company) {
      return res.status(400).json({ message: "Company is required" })
    }
    
    const productDetails = await searchedProductDetails(url, company);
    return res.status(200).json(new ApiResponse(200, productDetails));
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message })
  }
}


const searchedProductDetails = async (url, company) => {
  switch (company) {
    case "Ryans": return getRyansSearchedProductDetails(url);
    case "StarTech": return getStarTecSearchedProductDetails(url);
    case "TechLandBD": return getTechLandSearchedProductDetails(url);
    case "BinaryLogic": return getBinaryLogicSearchedProductDetails(url);
  }
}