// require pdf kit and inqiurer
const pdfKit = require("PDFKit");
const process = require("process");
const axios = require('axios');
const fs = require("fs");



// request gitHub User name from user. Using Process.
const username = process.argv[2];
// query link to github
const queryURL = `https://api.github.com/users/${username}`;
axios.get(queryURL)
  .then((response) => {
    fs.writeFile("user.txt",JSON.stringify(response.data,null,"\t"), (err) =>
    {
        if (err) throw err;
        console.log('The file has been saved!');
    });
  })
