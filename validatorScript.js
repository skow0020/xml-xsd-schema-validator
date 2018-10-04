
const validator = require('xsd-schema-validator');
const fs = require('fs');
const path = require('path');

const testFolder = './xmls/';
const resultsFile = 'results.csv'

const files = fs.readdirSync('./');
const xsdFiles = files.filter(function(file) {
    return path.extname(file).toLowerCase() === '.xsd';
});
if (xsdFiles.length != 1 ) { throw error('There must be exactly 1 xsd file in the base directory'); }

fs.writeFileSync(resultsFile, 'FileName, Results, Messages,\n')

fs.readdir(testFolder, (err, files) => {
  files.forEach(xmlfile => {
    validator.validateXML({ file: `${testFolder}${xmlfile}` }, xsdFiles[0], function(err, result) {
      if (err && !err.message.includes('invalid xml')) {
        throw err;
      }
     
      const validity = result.valid ? 'Valid XML' : 'Invalid XML';
      
      const fileResult = `${xmlfile}, ${validity}, ${result.messages}\n`;
      console.log(fileResult)
      fs.appendFileSync('results.csv', fileResult);
    });
  });
})