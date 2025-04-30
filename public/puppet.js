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

  await page.click("body > nav > div > button");

  //   click on sign in button
  await page.click("#loginLink");

  //   provide email and password to sign in
  await page.type("#loginEmail", "investigator@test.com");
  await page.type("#loginPassword", "investigator@test.com");

  //   click on submit button
  await page.click("#loginSubmitButton");

  await page.keyboard.press("Escape");

  // force a delay
  await new Promise((r) => setTimeout(r, 1000));

  // close the browser
  // browser.close();
}

go();
