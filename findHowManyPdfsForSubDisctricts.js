
const fs = require("fs");

const puppeteer = require("puppeteer");

const baseUrl = `https://www.ceopunjab.gov.in/`;
//assemblyelectoraldetailsbooth?AC_NO=026
const allSubDistricsUrl=require("./subDistricts.json").data

const getDataFromUrl = async () => {
    let finalDataUrls=[]
    let count=0;
  try {
    for(let url of allSubDistricsUrl){
        if(count==4){
            break;
          }
        let  acNoRegex = /AC_NO=(\d+)/

        const match = url.match(acNoRegex);

        const acNoValue = match ? match[1] : null;

        let dynamicUrl=`${baseUrl}assemblyelectoraldetailsbooth?AC_NO=${acNoValue}`

        const browser = await puppeteer.launch({
            headless: false,
            slowMo: 50,
            defaultViewport: null,
            args: [
              "--start-maximized",
              "--single-process",
              "--no-zygote",
              "--no-sandbox",
            ],
          });
          const page = await browser.newPage();
      
          // Navigate to the page with the button
          await page.goto(dynamicUrl, {
            waitUntil: ["networkidle0", "domcontentloaded", "networkidle2"],
          });
      

          const rows = await page.$$(".table-striped tbody>tr");

          finalDataUrls.push({[dynamicUrl]:rows.length})
      
          count++
      
      
          await page.close();
      
          await browser.close();
          
    }
    fs.appendFileSync("noOfPdfSubDistrictsHave.json", JSON.stringify({data:finalDataUrls}, null, 2));
  } catch (error) {
    console.log(error);
  }
};




getDataFromUrl()

