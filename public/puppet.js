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

  //Click on new case
  await page.click("#newCaseButton");

  // Enter case info
  await page.type("#newCaseTitle", "Puppeteer Test Case");
  await page.type("#newCaseDescription", "Puppeteer Test Case");
  await page.type("#newCaseClientEmail", "client@test.com");
  await page.type("#newCaseDueDate", "05062025");
  await page.click("#newCaseSubmitButton");

  // force a delay
  await new Promise((r) => setTimeout(r, 1000));
  // close the browser
  browser.close();
}

go();
