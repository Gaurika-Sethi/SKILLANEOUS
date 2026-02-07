import puppeteer from "puppeteer";
import puppeteerCore from "puppeteer-core";
import chromium from "@sparticuz/chromium";

const generatePdfFromHtml = async (html) => {
  const isServerless = Boolean(process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.VERCEL);
  const puppeteerLib = isServerless ? puppeteerCore : puppeteer;
  const launchOptions = isServerless
    ? {
        args: chromium.args,
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
        defaultViewport: chromium.defaultViewport,
      }
    : {
        headless: "new",
      };

  const browser = await puppeteerLib.launch(launchOptions);

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
