const puppeteer = require("puppeteer");
const axios=require("axios")
const allDistrictUrls=require("./districts.json")

const baseUrl = `https://www.ceopunjab.gov.in/`;

const fs = require("fs");



const getDataFromUrl = async () => {
  try {
    let finalHrefValues=[]
    let count=0
    for(let districtUrl of allDistrictUrls.data){

      if(count==3){
        break;
      }
        const browser = await puppeteer.launch({
            headless: false,
            slowMo: 50,
      
          });
          const page = await browser.newPage();
      
          // Navigate to the page with the button
          await page.goto(baseUrl+districtUrl, {
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
          finalHrefValues.push(...hrefValues)
          // const rows = await page.$$(".table-striped tbody>tr");
          // console.log(rows,"rows")
      
         
      
          await page.close();
      
          await browser.close();
          count++
    }
    fs.appendFileSync("subDistricts.json", JSON.stringify({data:finalHrefValues}, null, 2));
  } catch (error) {
    console.log(error);
  }
};




getDataFromUrl()
