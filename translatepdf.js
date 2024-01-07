
const Tesseract = require("tesseract.js");
const fs = require("fs-extra");
const path = require("path");
const translatte = require("translatte");

const inputFolderPath = `pdf_output_images`;
const outputFolderPath = `output_texts_folder_images`;

// Create output folder if it doesn't exist
fs.ensureDirSync(outputFolderPath);

// Function to translate text using google-translate-api
async function translateText(text) {
  try {
    const translation = await translatte(text, { to: "en" });
    return translation.text;
  } catch (error) {
    console.error("Translation error:", error);
    return text;
  }
}

const processImage = async (file) => {
  const imagePath = path.join(inputFolderPath, file);

  try {
    const { data: { text } } = await Tesseract.recognize(imagePath, "pan", {
      logger: (m) => console.log(m),
    });

    const translatedText = await translateText(text);

    const txtFileName = `${path.parse(file).name}.txt`;
    const txtFilePath = path.join(outputFolderPath, txtFileName);

    // Write the translated text to a text file asynchronously
    await fs.promises.writeFile(txtFilePath, translatedText);

    console.log(`Converted ${file} to ${txtFileName}`);
  } catch (error) {
    console.error(`Error converting ${file}`, error);
  }
};

const run = async () => {
  try {
    const imageFiles = fs.readdirSync(inputFolderPath).slice(0, 5);
    console.log(imageFiles, "images");

    const promises = imageFiles.map(processImage);

    await Promise.all(promises);
  } catch (error) {
    console.error("Error processing images:", error);
  }
};

run();