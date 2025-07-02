import { parsePrice } from "./converter.js";
import { launchBrowser } from "./puppeteer-browser.js";

export const getUltraTechSearchedProducts = async (page, searchKey = "", currentPage = 1) => {
  try {
    // const url = `https://www.ultratech.com.bd/index.php?route=product/search&search=monitor&page=2`;
    const url = `https://www.ultratech.com.bd/index.php?route=product/search&search=${searchKey}&page=${currentPage}`;
    await page.goto(url, { timeout: 60000, waitUntil: "domcontentloaded" });


    const products = await page.evaluate(() => {
      const productElements = document.querySelectorAll(".product-thumb");

      return {
        data: Array.from(productElements).map((product) => {
          const imageUrl = product.querySelector(".image img")?.getAttribute("src") || "";
          const title = product.querySelector(".caption .name a")?.innerText;
          const price = product.querySelector(".price .price-new")?.innerText || product.querySelector(".price .price-normal")?.innerText || product.querySelector(".price .price-old")?.innerText;
          const discount = product.querySelector(".product-labels b")?.innerText || "";
          const productDetailsLink = product.querySelector(".product-img")?.getAttribute("href").split("?")[0] || "";


          return {
            imageUrl,
            title,
            price,
            discount,
            productDetailsLink,
            company: "UltraTech"
          };
        }),
      }
    });

    products.data = products.data.map(p => ({
      ...p,
      price: parsePrice(p.price),
    }));

    return products.data;
  } catch (error) {
    console.log("getUltraTechSearchedProducts:", error);
    return null;
  }
}

export const getUltraTechSearchedProductDetails = async (url) => {
  try {
    const browser = await launchBrowser();
    const page = await browser.newPage();
    // const url = 'esonic-22elmw-21-5-inch-hd-led-monitor';
    const productDetailsLink = `https://www.ultratech.com.bd/${url}`

    await page.goto(productDetailsLink, { timeout: 60000, waitUntil: "domcontentloaded" });


    const product = await page.evaluate(() => {
      const productInfo = document.querySelector(".product-info");
      const imageUrls = productInfo && [...productInfo.querySelectorAll(".swiper-slide img")].map(img => img.src) || [];
      const title = productInfo && productInfo.querySelector("#product .title")?.innerText?.trim()?.split("\n")?.[0] || "";
      const reviews = productInfo && productInfo.querySelector(".product-right .review-links a")?.innerText || "";
      const productId = productInfo && productInfo.querySelector("#product .product-stats .product-model")?.innerText.split("\n")?.[1] || ""
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
        company: "UltraTech",
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

    return { ...product, productDetailsLink };
  } catch (error) {
    console.log("getUltraTechSearchedProductDetails:", error)
  }
}