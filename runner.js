
const execSync = require("child_process");

const fs=require("fs")

const allPdfsLinks=require("./allPdfsLinks.json").data

const allDownloadedPDf=fs.readdirSync("pdf_collection")

const allImages=fs.readdirSync("pdf_output_images")


const scraper = (module.exports = {
  run: async (page,variable) => {
    try {
      console.log("process started");
      e = execSync.exec(`node translatepdf.js`);

      await new Promise((resolve) => {
        e.on("close", resolve);
      });
      console.log(
        " ------------------------------------------------------ ended ",variable
      );
    } catch (error) {
      console.log(error);
    }
  },

  schedule: async () => {
    let counter = 0;
    var intr = setInterval(() => {
      if (counter>=allImages.length) {
        clearInterval(intr);
        console.log("cleareated",counter)
      } else {
        scraper.run(allImages[counter],counter);
        counter += 1;

      }
      console.log(counter,"started")
    }, 60000);
  },
});

scraper.schedule();

