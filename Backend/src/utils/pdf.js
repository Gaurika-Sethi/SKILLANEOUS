import puppeteer from "puppeteer";

const generatePdfFromHtml = async (html) => {
    const browser = await puppeteer.launch({
        headless: "new",
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    
    try {
        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: "networkidle0" });

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