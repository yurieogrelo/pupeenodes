const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/screenshot', async (req, res) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.google.com');
  const screenshot = await page.screenshot();

  await browser.close();

  res.type('image/png');
  res.send(screenshot);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
