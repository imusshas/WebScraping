import puppeteer from "puppeteer";
import { parsePrice } from "./converter.js";

export const getStarTecSearchedProducts = async (searchKey = "") => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const url = `https://www.startech.com.bd/product/search?search=${searchKey}`;
  await page.goto(url, { timeout: 60000, waitUntil: "domcontentloaded" });


  const products = await page.evaluate(() => {
    const productElements = document.querySelectorAll(".p-item-inner");
    const currentPage = parseInt(document.querySelector(".pagination")?.querySelector(".active")?.innerText || 0);

    return {
      data: Array.from(productElements).map((product) => {
        const imageUrl = product.querySelector(".p-item-img img")?.getAttribute("src") || "";
        const title = product.querySelector(".p-item-name a").innerText;
        const price = product.querySelector(".p-item-price .price-new")?.innerText || product.querySelector(".p-item-price")?.innerText;
        const discount = product.querySelector(".mark")?.innerText || "";
        const productDetailsLink = product.querySelector(".p-item-img a")?.getAttribute("href") || "";


        return {
          imageUrl,
          title,
          price,
          discount,
          productDetailsLink,
          company: "Star-Tech"
        };
      }),
      next: `https://www.startech.com.bd/product/search?&search=keyboard&page=${currentPage + 1}`
    }
  });


  await browser.close();

  products.data = products.data.map(p => ({
    ...p,
    price: parsePrice(p.price),
  }));

  return products;
}