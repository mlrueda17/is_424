const puppeteer= require("puppeteer");

async function go() {
    const browser= await puppeteer.launch({
    headless:false,
})


// go to the site to be tested 
const page = await browser.newPage();

await page.goto("https://mycar-collection-f21.web.app/index_.html");

//click on sign-in button
await page.click("#signinbtn");
}
//provide email and pw to sign in

await page.type("#email_","temp12345@gmail.com")
await page.type("#password_","temp12345@gmail.com")

//click button

await page.click("#sum_submit")

// search for a car (force a delay as well)
    await new Promise((r)=> setTimeout(() => 
await page.type("#search_bar", "my test car")
await page.click("#search_button")


//close browser
browser.close();
go();