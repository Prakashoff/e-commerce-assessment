import { chromium, Page } from 'playwright';

const scraper = async (): Promise<void> => {
    const args = process.argv.slice(2);
    const dummyEmail = args[0];
    const dummyPassword = args[1];

    if (!dummyEmail || !dummyPassword) {
        console.error("❌ Username or password not provided.");
        process.exit(1);
    }

    const browser = await chromium.launch({ headless: true });
    const page: Page = await browser.newPage();
    console.log('Opening the browser...');

    await page.goto('https://automationexercise.com/', { waitUntil: 'domcontentloaded' });

    const loginSelector = 'a[href="/login"]';
    await page.waitForSelector(loginSelector);
    await page.click(loginSelector);

    const userEmailSelector = "input[type='email']";
    const userPasswordSelector = "input[type='password']";
    const submitButtonSelector = "button[type='submit']";

    await page.waitForSelector(userEmailSelector);
    await page.type(userEmailSelector, dummyEmail, { delay: 100 });
    await page.type(userPasswordSelector, dummyPassword, { delay: 100 });
    await page.click(submitButtonSelector);
    console.log('Logged in successfully.');

    for (let i = 1; i <= 12; i++) {
        if (![10, 9].includes(i)) {
            let cartSelector = `a[data-product-id="${i}"]`;
            try {
                await page.waitForSelector(cartSelector, { timeout: 5000 });
                await page.click(cartSelector);
                await page.waitForTimeout(2000);
                const continueShoppingSelector = 'button[data-dismiss="modal"]';
                await page.waitForSelector(continueShoppingSelector, { timeout: 5000 });
                await page.click(continueShoppingSelector);
                await page.waitForTimeout(2000);
            } catch (err) {
                if (err instanceof Error) {
                    console.error(`Failed to click ${cartSelector}: ${err.message}`);
                } else {
                    console.error(`Failed to click ${cartSelector}:`, err);
                }
            }
        }
    }

    const cartLinkSelector = 'a[href="/view_cart"]';
    await page.waitForSelector(cartLinkSelector);
    await page.click(cartLinkSelector);

    await page.waitForSelector('table.table.table-condensed');

    const tableData = await page.evaluate(() => {
        const results: { title: string, url: string, price: string }[] = [];

        const rows = document.querySelectorAll('table tr');
        rows.forEach(row => {
            const titleTd = row.querySelector('h4');
            const urlTd = row.querySelector('h4 a');
            const priceTd = row.querySelector('td.cart_price');

            const title = titleTd?.textContent?.trim() || '';
            const url = (urlTd as HTMLAnchorElement)?.href || '';
            const price = priceTd?.textContent?.trim() || '';

            if (title && url && price) {
                results.push({ title, url, price });
            }
        });

        return results;
    });

    // ✅ This is the ONLY way to send data to Streamlit
    console.log(JSON.stringify(tableData, null, 2));

    await browser.close();
};

scraper();
