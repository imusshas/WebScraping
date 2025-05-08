import puppeteer from "puppeteer";
import { parsePrice } from "./converter.js";

export const getRyansSearchedProduct = async (searchKey = "", currentPage = 1) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();


  const url = `https://www.ryans.com/search?q=${searchKey}&page=${currentPage}`;
  await page.goto(url, { timeout: 60000, waitUntil: "domcontentloaded" });

  const products = await page.evaluate((searchKey) => {
    const productElements = document.querySelectorAll(".card.h-100");
    const currentPage = parseInt(document.querySelector(".pagination")?.querySelector(".active")?.innerText || 0)

    return {
      data: Array.from(productElements).map((product) => {
        const imageUrl = product.querySelector(".image-box img")?.getAttribute("src") || "";
        const title = product.querySelector(".card-body .card-text a")?.innerText?.trim()?.split("\n")?.[0] || "";
        const price = product.querySelector(".card-body .sp-text")?.innerText || product.querySelector(".card-body .pr-text")?.innerText;
        const discount = product.querySelector(".card-body .fs-text")?.innerText || "";
        const productDetailsLink = product.querySelector(".image-box a")?.getAttribute("href") || "";

        return {
          imageUrl,
          title,
          price,
          discount: discount ? discount.replace(/Save\s*Tk\s*(\d+)/gi, "Save $1৳") : "",
          productDetailsLink,
          company: "Ryans"
        };
      }),
      next: `https://www.ryans.com/search?q=${searchKey}&page=${currentPage + 1}`
    }
  }, searchKey);


  await browser.close();

  products.data = products.data.map(p => ({
    ...p,
    price: parsePrice(p.price),
  }));

  return products;
}