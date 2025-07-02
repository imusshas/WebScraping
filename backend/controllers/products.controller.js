import { ApiResponse } from "../utils/ApiResponse.js";
import { getBinaryLogicSearchedProducts } from "../utils/binary-logic.js";
import { findProductDetails } from "../utils/find-product-details.js";
import { getGlobalBrandSearchedProducts } from "../utils/global-brand-private.js";
import { launchBrowser } from "../utils/puppeteer-browser.js";
import { getRyansSearchedProducts } from "../utils/ryans.js";
import { getSkyLandSearchedProducts } from "../utils/sky-land.js";
import { getStarTechSearchedProducts } from "../utils/star-tech.js";
import { getTechLandSearchedProducts } from "../utils/tech-land.js";
import { getUCCSearchedProducts } from "../utils/ucc.js";
import { getUltraTechSearchedProducts } from "../utils/ultra-tech.js";


export const getSearchedProducts = async (req, res) => {
  try {
    const { searchKey, currentPage } = req.params;
    console.log("params:", req.params);
    if (!searchKey) {
      res.status(400).json({ message: "Search key is required" })
      return;
    }

    const browser = await launchBrowser();

    const sources = [
      { name: "Ryans", fn: getRyansSearchedProducts },
      { name: "StarTech", fn: getStarTechSearchedProducts },
      { name: "TechLand", fn: getTechLandSearchedProducts },
      { name: "BinaryLogic", fn: getBinaryLogicSearchedProducts },
      { name: "SkyLand", fn: getSkyLandSearchedProducts },
      { name: "UCC", fn: getUCCSearchedProducts },
      { name: "GlobalBrand", fn: getGlobalBrandSearchedProducts },
      { name: "UltraTech", fn: getUltraTechSearchedProducts },
    ];

    const scrapePromises = sources.map(async ({ fn }) => {
      const page = await browser.newPage();
      try {
        const result = await fn(page, searchKey, currentPage);
        return result;
      } finally {
        await page.close();
      }
    });

    const results = await Promise.allSettled(scrapePromises);

    const allProducts = results.reduce((acc, result) => {
      if (result.status === "fulfilled") acc.push(...result.value);
      return acc;
    }, []);

    await browser.close();
    console.log(allProducts.length)
    res.status(200).json(new ApiResponse(200, allProducts));

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

    const productDetails = await findProductDetails(url, company);
    return res.status(200).json(new ApiResponse(200, productDetails));
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message })
  }
}