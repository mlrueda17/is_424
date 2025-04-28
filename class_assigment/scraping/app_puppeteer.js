const puppeteer = require("puppeteer");

const fs = require("fs/promises");

async function go(){

const browser = await puppeteer.launch({
    headless: false ,
    
});

const page = await browser.newPage();


const mydata = await page.$eval("#right")

// save the data into a file
await fs.writeFile("Contactinfo.txt", mydata);


//get all photoes 
const photos= await page.$$eval("img", (images)=> {
    return images.map(x => x.src)
});

//console.log(photos);

for(const photo of photos){
    //open the photo in browser tab
    const photopage = await page.goto(photo);
    //store the photo locally

    await fs.writeFile(photo.split("/").pop(), await photopage.buffer())
}
}

// call go
go();