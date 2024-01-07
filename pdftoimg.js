const pdfPoppler = require('pdf-poppler');

const pdfPath = `pdf_collection/${process.argv[2]}`;
const outputPath = 'pdf_output_images';
const fs=require("fs-extra")

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}
const opts = {
  format: 'png',
  out_dir: outputPath,
  out_prefix: `pdf_page${process.argv[2]}`,
  page: null, // To convert all pages
  scale: 1500, // Set the scale (resolution) in DPI, adjust as needed
};

pdfPoppler.convert(pdfPath, opts)
  .then((info) => {
    console.log(info);
    console.log('PDF converted to images successfully!');
  })
  .catch((error) => {
    console.error('Error converting PDF to images:', error);
  });

