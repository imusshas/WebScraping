import { parsePrice } from "./converter.js";
import { launchBrowser } from "./puppeteer-browser.js";

export const getGlobalBrandSearchedProducts = async (searchKey = "", currentPage = 1) => {
  try {
    const browser = await launchBrowser();
    const page = await browser.newPage();

    const url = `https://www.globalbrand.com.bd/index.php?route=product/search&search=${searchKey}&page=${currentPage}`;
    // const url = `https://www.globalbrand.com.bd/index.php?route=product/search&search=monitor&page=1`;
    await page.goto(url, { timeout: 60000, waitUntil: "domcontentloaded" });


    const products = await page.evaluate(() => {
      const productElements = document.querySelectorAll(".product-thumb");

      return {
        data: Array.from(productElements).map((product) => {
          const imageUrl = product.querySelector(".image img")?.getAttribute("src") || "";
          const title = product.querySelector(".caption .name a")?.innerText;
          const price = product.querySelector(".price .price-new")?.innerText || product.querySelector(".price .price-normal")?.innerText || product.querySelector(".price .price-old")?.innerText;
          const discount = product.querySelector(".product-label")?.innerText || "";
          const productDetailsLink = product.querySelector(".product-img")?.getAttribute("href").split("?")[0] || "";


          return {
            imageUrl,
            title,
            price,
            discount,
            productDetailsLink,
            company: "GlobalBrand"
          };
        }),
      }
    });


    await browser.close();

    products.data = products.data.map(p => ({
      ...p,
      price: parsePrice(p.price),
    }));

    return products.data;
  } catch (error) {
    console.log("getGlobalBrandSearchedProducts:", error);
    return null;
  }
}

export const getGlobalBrandSearchedProductDetails = async (url) => {
  try {
    const browser = await launchBrowser();
    const page = await browser.newPage();
    // const url = 'lenovo-ideapad-slim-3i-8-83em007flk-13th-gen-core-i5-laptop';
    // const url = 'asus-proart-display-pa27ucge-4k-ultra-hd-ips-professional-monitor';

    await page.goto(`https://www.globalbrand.com.bd/${url}`, { timeout: 60000, waitUntil: "domcontentloaded" });


    const product = await page.evaluate(() => {
      const productInfo = document.querySelector(".product-info");
      const imageUrls = productInfo && [...productInfo.querySelectorAll(".swiper-slide img")].map(img => img.src) || [];
      const title = productInfo && productInfo.querySelector("#product .title")?.innerText?.trim()?.split("\n")?.[0] || "";
      const reviews = productInfo && productInfo.querySelector(".review-links a")?.innerText || "";
      const id = productInfo && productInfo.querySelector("#product span")?.innerText || ""
      const match = id.match(/Key Features of (.+?):/);
      const productId = match ? match[1] : "";
      const specialPrice = productInfo && productInfo.querySelector(".product-right .product-price-new")?.innerText || "";
      const regularPrice = productInfo && productInfo.querySelector(".product-right .product-price")?.innerText || productInfo && productInfo.querySelector(".product-right .product-price-old")?.innerText || "";

      const specifications = document.querySelector("#tab-specification table");

      const attributeTitles = specifications ? [...specifications.querySelectorAll("tbody tr td:first-child")].map(tag => tag?.innerText) : [];

      const attributeValues = specifications ? [...specifications.querySelectorAll("tbody tr td:last-child")].map(tag => tag.innerText) : [];


      const attributes = attributeTitles ? attributeTitles.map((title, index) => ({
        [title]: attributeValues[index] || null
      })) : {};

      return {
        imageUrls,
        title,
        reviews,
        productId,
        company: "GlobalBrand",
        specialPrice,
        regularPrice,
        attributes: {
          ...Object.assign({}, ...Object.values(attributes))
        },
      }
    });


    await browser.close();

    const regex = product.reviews.match(/\((\d+)\)/);
    const reviewCount = regex ? parseInt(regex[1], 10) : 0;

    product.reviews = `${reviewCount} reviews`
    product.regularPrice = parsePrice(product.regularPrice);
    product.specialPrice = parsePrice(product.specialPrice);

    console.log(product);

    return { ...product, productDetailsLink: `https://www.globalbrand.com.bd/${url}` };
  } catch (error) {
    console.log("getGlobalBrandSearchedProductDetails:", error)
  }
}