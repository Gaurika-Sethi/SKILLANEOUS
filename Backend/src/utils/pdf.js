import puppeteer from "puppeteer";

const generatePdfFromHtml = async (html) => {
    const browser = await puppeteer.launch({
        headless: "new",
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    
    try {
        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: "networkidle0" });

            await page.evaluate(async () => {
                const imgs = Array.from(document.images);
                await Promise.all(
                    imgs.map((img) => {
                        if (img.complete) return Promise.resolve();
                        return new Promise((resolve, reject) => {
                            img.addEventListener("load", resolve);
                            img.addEventListener("error", resolve); 
                        })
                    }),
                );
            });

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await sleep(300);

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