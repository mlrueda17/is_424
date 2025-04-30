// Import puppeteer

const puppeteer = require("puppeteer");

async function go() {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 50,
  });

  //   go to site to be tested
  const page = await browser.newPage();

  await page.goto("https://mycar-collection-f21.web.app/index_.html");

  //   click on sign in button
  await page.click("#signinbtn");

  //   provide email and password to sign in
  await page.type("#email_", "temp12345@gmail.com");
  await page.type("#password_", "temp12345@gmail.com");

  //   click on submit button
  await page.click("#signin_form > div:nth-child(3) > div > button");

  // search for a car
  // force a delay
  await new Promise((r) => setTimeout(r, 1000));

  await page.type("#search_bar", "my test car");
  await page.click("#search_button");
  //   close the browser
  //   browser.close();
}

go();
