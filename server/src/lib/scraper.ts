import $ from "cheerio";
import puppeteer from "puppeteer";
import validator from "validator";

import { urlToSelector } from "./urlToSelector";

const dataScrape = (selector: string, html: string) => {
  const data = $(selector, html).html();
  if (data) {
    const match = data.match(/(\d+(?:\.\d{1,2})?)/gm);
    if (match) {
      let fullString = match.join("");
      return fullString;
    } else {
      return null;
    }
  }
};

export const scraper = async (url: string) => {
  if (!validator.isURL(url)) {
    return null;
  }
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--no-sandbox"]
  });
  try {
    const page = await browser.newPage();

    await page.goto(url);
    const html = await page.content();
    const selector = urlToSelector(url);

    if (typeof selector === "string") {
      let result = dataScrape(selector, html);
      return result;
    } else if (Array.isArray(selector)) {
      let data = selector.map(item => dataScrape(item, html));
      return data.filter(item => item)[0];
    } else {
      return null;
    }
  } catch (error) {
    throw Error("Error on page retrieval");
  } finally {
    await browser.close();
  }
};
