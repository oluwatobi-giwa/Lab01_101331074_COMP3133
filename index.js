const fs = require('fs')
const csv = require('csv-parser');
const file = 'input_countries.csv';


// Delete canada.txt and usa.txt if exist
if(fs.existsSync('canada.txt')) {
    fs.unlinkSync('canada.txt');
}

if(fs.existsSync('usa.txt')) {
    fs.unlinkSync('usa.txt');
}


function writeToFile(fromFile, content, toFile) {
    const writeStream = fs.createWriteStream(toFile);

    // Read from the CSV file using pipe & stream
    fs.createReadStream(fromFile)
    .pipe(csv())
    .on('data', (row) => {
        if (row.country === content) {
            writeStream.write(`${JSON.stringify(row)}\n`);
          }
    })
    .on('end', () => {
        writeStream.end();
        console.log('File processed');
    })
  }

  // Write filtered countries to files
  writeToFile(file, 'Canada', 'canada.txt');
  writeToFile(file, 'United States', 'usa.txt');

