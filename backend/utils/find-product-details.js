import { getBinaryLogicSearchedProductDetails } from "../utils/binary-logic.js";
import { getRyansSearchedProductDetails } from "../utils/ryans.js";
import { getStarTechSearchedProductDetails } from "../utils/star-tech.js";
import { getTechLandSearchedProductDetails } from "../utils/tech-land.js";
import { getSkyLandSearchedProductDetails } from "./sky-land.js";

export const findProductDetails = async (url, company) => {
  switch (company) {
    case "Ryans": return getRyansSearchedProductDetails(url);
    case "StarTech": return getStarTechSearchedProductDetails(url);
    case "TechLandBD": return getTechLandSearchedProductDetails(url);
    case "BinaryLogic": return getBinaryLogicSearchedProductDetails(url);
    case "SkyLandBD": return getSkyLandSearchedProductDetails(url);
    default: throw new Error(`Unsupported company: ${company}`);
  }
}