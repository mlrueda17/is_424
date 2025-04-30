// Import puppeteer

const puppeteer = require("puppeteer");

async function go() {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 50,
  });

  //   go to site to be tested
  const page = await browser.newPage();

  await page.goto("https://pidashboard-e9e97.web.app");

  //   click on sign in button
  await page.click("#loginLink");

  //   provide email and password to sign in
  await page.type("#loginEmail", "temp12345@gmail.com");
  await page.type("#loginPassword", "temp12345@gmail.com");

  //   click on submit button
  await page.click("#loginSubmitButton > div:nth-child(3) > div > button");

  // force a delay
  await new Promise((r) => setTimeout(r, 1000));

  //   close the browser
  //   browser.close();
}

go();
