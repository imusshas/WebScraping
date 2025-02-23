import puppeteer from "puppeteer";

const scrape = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const url = "https://www.ryans.com/search?q=keyboard";
  await page.goto(url);

  const products = await page.evaluate(() => {
    const productElements = document.querySelectorAll(".card.h-100");
    const currentPage = parseInt(document.querySelector(".pagination")?.querySelector(".active")?.innerText || 0)

    return {
      data: Array.from(productElements).map((product) => {
        const imageUrl = product.querySelector(".image-box img")?.getAttribute("src") || "";
        const title = product.querySelector(".card-body .sp-text-link")?.innerText || "";
        const description = product.querySelector(".card-body .card-text")?.innerText?.trim()?.split("\n") || [""];
        const price = product.querySelector(".card-body .sp-text")?.innerText || product.querySelector(".card-body .pr-text")?.innerText;
        const discount = product.querySelector(".card-body .fs-text")?.innerText || "";
        const productDetailsLink = product.querySelector(".image-box a")?.getAttribute("href") || "";

        return {
          imageUrl,
          title,
          description: description?.[0],
          productId: description?.[1]?.trim(),
          price,
          discount,
          productDetailsLink,
        };
      }),
      next: `https://www.ryans.com/search?q=Keyboard&limit=30&page=${currentPage + 1}`
    }
  });

  console.log(products);


  await browser.close();
}

scrape();

