const fs=require("fs")
const path=require("path")
const axios=require("axios")

async function downloadAndConvertPDFs(url, outputFolder) {
  
    try {
      const response = await axios.get(url, { responseType: 'stream' });

      // Extract file name from the URL
      const fileName = path.basename(url);

      // Create a write stream for the output file
      const writer = fs.createWriteStream(path.join(outputFolder, fileName));

      // Pipe the response data to the writer
      response.data.pipe(writer);

      // Wait for the writer to finish
      await new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
      });

      console.log(`Downloaded and saved: ${fileName}`);
    } catch (error) {
      console.error(`Error downloading ${url}: ${error.message}`);
    }
  
}

// Output folder for saving converted files
const outputFolder = 'pdf_collection';

// Create the output folder if it doesn't exist
if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder);
}

// Call the function to download and convert PDFs
downloadAndConvertPDFs(process.argv[2], outputFolder);