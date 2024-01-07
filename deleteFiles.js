const fs = require('fs');
const path = require('path');

const directoryPath = 'pdf_output_images'; // Replace this with the actual path to your folder

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  // Sort the files by their creation time or modification time


  // Delete the first 1000 files
  const filesToDelete = files.slice(0, 10);

  filesToDelete.forEach((file) => {
    const filePath = path.join(directoryPath, file);

    // Delete the file
    fs.unlink(filePath, (unlinkErr) => {
      if (unlinkErr) {
        console.error('Error deleting file:', unlinkErr);
      } else {
        console.log(`Deleted: ${filePath}`);
      }
    });
  });
});