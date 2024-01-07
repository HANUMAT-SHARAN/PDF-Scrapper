// /**
//    1 map tag 
//       [area,area,area]
//         {href:assemblyelectoraldetails?Dist_NO=1}
//             map
//               [area,area,area]
//                     {href:assemblyelectoraldetails?Dist_NO=22&AC_NO=001}
//                           {url:/assemblyelectoraldetailsbooth?AC_NO=001}

const allSubDistrictsUrls=require("./noOfPdfSubDistrictsHave.json").data
const fs=require("fs")

const getAllCombinationsOfPdf = async () => {

    try {
      const urlsArray=[]
      const pattern = /AC_NO=(\d+)/;

      for (obj of allSubDistrictsUrls) {
        let key = Object.keys(obj)[0];
        let value = Object.values(obj)[0];
  
        const matches = pattern.exec(key);
  
        if (matches) {
          let  acNoValue = matches[1];
          acNoValue=acNoValue.toString().padStart(3, "0")

          // const pdfEndpoint=`https://www.ceopunjab.gov.in/erollpdf2/A001/S19A001P002.pdf`
          
            for (let i = 1; i <= value - 1; i++) {
              const formattedI = i.toString().padStart(3, "0");
              const dynamicUrl = `https://www.ceopunjab.gov.in/erollpdf2/A${acNoValue}/S19A${acNoValue}P${formattedI}.pdf`;
              // console.log(dynamicUrl);
              urlsArray.push(dynamicUrl)
            }
        }
      }
  
      fs.appendFileSync("allPdfsLinks.json", JSON.stringify({data:urlsArray}, null, 2));
  
      console.log("Downloaded");
    } catch (error) {
      console.log(error);
    }
  };
  
  getAllCombinationsOfPdf()