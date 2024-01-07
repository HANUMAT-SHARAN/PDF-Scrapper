const fs = require('fs');
const json2csv = require('json2csv').Parser;

// Specify the folder path containing the text files
const folderPath = 'output_texts_folder_images';



// Read the list of files in the folder
const folderNames = fs.readdirSync(folderPath);
console.log(folderNames,"folder name")
const nameRegex = /Name: ([^\n]+)/g;
const ageRegex = /Age: (\d+)/g;
const sexRegex = /Sex: (\w+)/g;
const fatherNameRegex = /Father['s]*\s*Name: ([^\n]+)/gi
const husBandNameRegex = /Husband['s]*\s*(Lord['s]*\s*)?Name: ([^\n]+)/gi;
const motherNameRegex=/Mother['s]*\s*Name: ([^\n]+)/gi;
const houseNameRegex=/House No.:([^\n]+)/g;
const voterIdRegex = /([A-Za-z]{3}\d+)/g;

const allPeople = [];
folderNames.forEach((el)=>{
 
        // console.log(`${folderPath+"/"+el}`,"what is this")
       
       
            // Read the text file
            const filePath = `${folderPath}/${el}`;
            const text = fs.readFileSync(filePath, 'utf-8');
          
            // Extract information using regular expressions
            const names = getAllMatches(nameRegex, text);
            const ages = getAllMatches(ageRegex, text).map(Number);
            const sexes = getAllMatches(sexRegex, text);
            const fatherNames = getAllMatches(fatherNameRegex, text);
            const husBandName = getAllMatches(husBandNameRegex, text);
            const motherName = getAllMatches(motherNameRegex, text);
            const houseName = getAllMatches(houseNameRegex, text);
            const voterId = getAllMatches(voterIdRegex, text);
            // Combine the extracted information into an array of objects
            const people = names.map((name, index) => ({
              Name: name,
              Age: ages[index],
              Sex: sexes[index],
              FatherName: fatherNames[index],
              HusbandName:husBandName[index],
              MotherName:motherName[index],
              HouseNo: houseName[index],
              VoterID:voterId[index]
            }));
          
            // Add the data from the current file to the array
            allPeople.push(...people);
});
   


// Define regular expressions for extracting information


// Array to store data from all files


// Loop through each file in the folder


// Convert the combined data to CSV
const json2csvParser = new json2csv();
const csv = json2csvParser.parse(allPeople);

// Write the CSV to a file
fs.writeFileSync('output_new.csv', csv);

console.log('CSV file created successfully.');

// Function to get all matches for a regex in a given text
function getAllMatches(regex, text) {
  const matches = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    matches.push(match[1]);
  }
  return matches;
}
