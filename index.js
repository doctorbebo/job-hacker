const fs = require("fs");
const inquirer = require("inquirer");
const pdfKit = require("pdfkit");
const gen = require("./userInfoGenerator.js");
let color = "green";
let user;
const doc = new pdfKit;
   
inquirer.prompt([
    {
        type : "input",
        name : "username",
        message: "What is your gitHub Username?"
    },
    {
        type: "list",
        name : "color",
        message: "Pick a background Color",
        default: "white",
        choices:['white', 'red', 'grey', 'green', 'yellow', 'blue']
    }
/* Pass your questions in here */
])
.then(answers => {
color = answers.color;
Main(answers.username);
});

async function Main(name)
{

    const leftMargin = 40;
    console.log(name);
    user = await gen.user(name)
    doc.pipe(fs.createWriteStream('portfolio.pdf'));

    doc.rect(0, 0, 1000, 1000).fillOpacity(0.3).fill(color);
    doc.fillOpacity(1).fill('black');

    doc.image(user.picURL,leftMargin , 40,{width: 250, height: 250});

    doc.fontSize(25).text(`Name: ${user.name}`,leftMargin,300).moveDown(1);
    doc.fontSize(14).text(`Bio: ${user.bio}`,leftMargin).moveDown(1);
    doc.fontSize(20).text(`Username: ${name}`,leftMargin).moveDown(0.5);
    doc.fontSize(20).text(`public repositories: ${user.numberOfPublicRepos}`,leftMargin).moveDown(0.5);
    doc.fontSize(20).text(`followers: ${user.numberOfFollowers}`,leftMargin).moveDown(0.5);
    doc.fontSize(20).text(`GitHub stars: ${user.numberOfStars}`,leftMargin).moveDown(0.5);
    doc.fontSize(20).text(`users following: ${user.numberFollowing}`,leftMargin).moveDown(0.5);


    const linkPos = 600;
    const linkPosMultiplier = doc.currentLineHeight() + 15;


    doc.fontSize(20)
   .fillColor('blue')
   .text('User Location',leftMargin, linkPos, {
     link: `https://www.google.com/maps/search/?api=1&query=${user.location}`,
     underline: true
   })
   doc.fontSize(20)
   .fillColor('blue')
   .text('GitHub Profile',leftMargin, linkPos + linkPosMultiplier,  {
     link: user.profileURL,
     underline: true
   })
   doc.fontSize(20)
   .fillColor('blue')
   .text('User Blog',leftMargin, linkPos + (linkPosMultiplier*2), {
     link: user.blogURL,
     underline: true
   })
    doc.end();
}




