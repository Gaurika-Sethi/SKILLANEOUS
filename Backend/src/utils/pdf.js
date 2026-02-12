import puppeteerCore from "puppeteer-core";
import chromium from "@sparticuz/chromium";
import fs from "node:fs";

const launchBrowser = async () => {
  if (process.platform === "win32") {
    const { default: puppeteer } = await import("puppeteer");
    return puppeteer.launch({ headless: "new" });
  }

  let executablePath;
  try {
    executablePath = await chromium.executablePath();
  } catch {
    executablePath = undefined;
  }

  if (executablePath && fs.existsSync(executablePath)) {
    return puppeteerCore.launch({
      args: chromium.args,
      executablePath,
      headless: chromium.headless,
      defaultViewport: chromium.defaultViewport,
    });
  }

  const { default: puppeteer } = await import("puppeteer");
  return puppeteer.launch({ headless: "new" });
};

const generatePdfFromHtml = async (html) => {
  const browser = await launchBrowser();

  try {
    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: "networkidle0" });

    // Wait for all images to load
    await page.evaluate(async () => {
      const imgs = Array.from(document.images);
      await Promise.all(
        imgs.map((img) => {
          if (img.complete) return Promise.resolve();
          return new Promise((resolve) => {
            img.addEventListener("load", resolve);
            img.addEventListener("error", resolve);
          });
        })
      );
    });

    // Small delay for fonts/styles
    await new Promise((resolve) => setTimeout(resolve, 300));

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
      scale: 0.96,
      margin: {
        top: "8mm",
        right: "8mm",
        bottom: "8mm",
        left: "8mm",
      },
    });

    return pdfBuffer;

  } finally {
    await browser.close();
  }
};

export { generatePdfFromHtml };
