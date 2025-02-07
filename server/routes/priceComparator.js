const express = require("express");
const router = express.Router();
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");


const scrapeMedicinePriceNetmeds = async (medicineName) => {
  try {
    // Launch Puppeteer
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Navigate to the URL
    const url = `https://www.netmeds.com/catalogsearch/result/${medicineName}/all`; // Replace with the actual URL
    await page.goto(url, { waitUntil: "networkidle2" });

    // Wait for the product list to load
    await page.waitForSelector(".ais-InfiniteHits-list");

    // Extract the content of the fully rendered page
    const content = await page.content();

    // Use Cheerio to parse the rendered HTML
    const $ = cheerio.load(content);

    // Extract data from the product list
    const products = [];
    $(".ais-InfiniteHits-item").each((index, element) => {
      const name = $(element).find(".clsgetname").text().trim();
      const price =
        $(element).find(".final-price").text().trim() ||
        $(element).find("#final_price").text().trim();
      const image = $(element).find(".product-image-photo").attr("src");
      const productSlug = $(element).find("a").attr("href"); // Extract the product page link

      // Construct full product URL
      const link = productSlug ? `https://www.netmeds.com${productSlug}` : null;

      if (name && price && image && link) {
        products.push({ name, price, image, link });
      }
    });

    await browser.close();
    return { website: "netmeds", products };
  } catch (error) {
    console.error("Error scraping dynamic content:", error.message);
    return []; // Return an empty array if there's an error
  }
};

async function scrapeMedicinePrices1mg(medicineName) {
  async function autoScroll(page) {
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 100;
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;

          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 100);
      });
    });
  }
  const url = `https://www.1mg.com/search/all?name=${medicineName}`;
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: "load", timeout: 60000 });

  // Scroll to the bottom to load lazy-loaded images
  await autoScroll(page);

  const content = await page.content();
  await browser.close();

  const $ = cheerio.load(content);
  const products = [];
  $(".style__product-box___3oEU6").each((index, element) => {
    const name = $(element).find(".style__pro-title___3G3rr").text().trim();

    // Find all price elements
    const priceElements = $(element).find(".style__price-tag___KzOkY");

    let price = "";

    // Iterate over price elements and pick the first one that doesn't contain "MRP"
    priceElements.each((i, el) => {
      const priceText = $(el).text().trim().replace(/₹+/g, "₹");
      if (!priceText.includes("MRP")) {
        // Ensuring MRP is excluded
        price = priceText;
        return false; // Break loop once we find the correct price
      }
    });

    const link = `https://www.1mg.com${$(element)
      .find("a.style__product-link___1hWpa")
      .attr("href")}`;

    const image =
      $(element).find(".style__product-image___1bkgA img").attr("src") ||
      $(element).find(".style__product-image___1bkgA img").attr("data-src");

    if (price) {
      // Only add products with a valid price
      products.push({ name, price, link, image });
    }
  });

  return { website: "1mg", products };
}

async function scrapeMedicinePricesPharmEasy(medicineName) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const url = `https://pharmeasy.in/search/all?name=${medicineName}`;
  await page.goto(url, { waitUntil: "domcontentloaded" });

  // Get the page content
  const content = await page.content();
  const $ = cheerio.load(content);

  let products = [];

  $(".Search_medicineLists__hM5Hk").each((_, element) => {
    const name = $(element)
      .find(".ProductCard_medicineName__8Ydfq")
      .text()
      .trim();

    let priceText = $(element)
      .find(".ProductCard_ourPrice__yDytt")
      .text()
      .trim();

    // Extract only numbers and decimal points, then prefix ₹
    const priceMatch = priceText.match(/\d+(\.\d{1,2})?/);
    const price = priceMatch ? `₹${priceMatch[0]}` : null;

    const link = "https://www.pharmeasy.in" + $(element).find("a").attr("href");
    const image = $(element)
      .find(".ProductCard_productImage__dq5lq")
      .attr("src");

    if (name && price && link && image) {
      products.push({ name, price, link, image });
    }
  });

  await browser.close();
  return { website: "PharmEasy", products };
}

router.get("/", async (req, res) => {
  try {
    const medicineName = req.query.q;
    const products = [];
    const products1 = await scrapeMedicinePrices1mg(medicineName);
    const products2 = await scrapeMedicinePriceNetmeds(medicineName);
    const products3 = await scrapeMedicinePricesPharmEasy(medicineName);
    products.push(products1);
    products.push(products2);
    products.push(products3);
    res.json(products);
  } catch (error) {
    console.error("Error scraping medicine prices:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
