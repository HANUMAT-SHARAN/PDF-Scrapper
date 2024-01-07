const puppeteer = require("puppeteer");
const axios=require("axios")

const baseUrl = `https://www.ceopunjab.gov.in/electoralphoto`;

const dynamicUrl = `https://www.ceopunjab.gov.in/${process.argv[2]}`;
const fs = require("fs");

const pdfEndpoint=`https://www.ceopunjab.gov.in/erollpdf2/A001/S19A001P002.pdf`

const initialUrl = `/electoralphoto`;

const getDataFromUrl = async () => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      slowMo: 50,

    });
    const page = await browser.newPage();

    // Navigate to the page with the button
    await page.goto(baseUrl, {
      waitUntil: ["networkidle0", "domcontentloaded", "networkidle2"],
    });

    const hrefValues = await page.evaluate(() => {
      const areaElements = document.querySelectorAll("map area");

      const hrefs = [];

      areaElements.forEach((area) => {
        hrefs.push(area.getAttribute("href"));
      });
      return hrefs;
    });

    // const rows = await page.$$(".table-striped tbody>tr");
    // console.log(rows,"rows")

    fs.appendFileSync("districts.json", JSON.stringify({data:hrefValues}, null, 2));

    await page.close();

    await browser.close();
  } catch (error) {
    console.log(error);
  }
};




getDataFromUrl()
