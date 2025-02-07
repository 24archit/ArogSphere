const express=require("express")
const router=express.Router();
const puppeteer=require("puppeteer");

router.get("/fetchHospitalDetails", async (req, res) => {
    try {
        const browser = await puppeteer.launch({
            headless: false, // Try headless: false to debug
            args: [
                "--disable-http2",
                "--no-sandbox",
                "--disable-setuid-sandbox",
                "--disable-web-security",
                "--disable-features=IsolateOrigins,site-per-process",
                "--disable-blink-features=AutomationControlled"
            ]
        });

        const page = await browser.newPage();

        // Set user-agent and headers to mimic a real browser
        await page.setUserAgent(
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
        );

        await page.setExtraHTTPHeaders({
            "Accept-Language": "en-US,en;q=0.9",
        });

        await page.goto("https://www.justdial.com/Koraput/Hospitals-in-Semiliguda", {
            waitUntil: "domcontentloaded",
            timeout: 60000,
        });

        const hospitals = await page.evaluate(() => {
            return Array.from(document.querySelectorAll(".resultbox_textbox")).map(e => ({
                name: e.querySelectorAll(".resultbox_title").innerText
            }));
        });

        await browser.close();

        return res.status(200).json({ success: true, data: hospitals });

    } catch (error) {
        console.error("Error scraping hospitals:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
});


module.exports=router