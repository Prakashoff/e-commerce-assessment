import { chromium, Page } from 'playwright';

(async (): Promise<void> => {
    const browser = await chromium.launch({ headless: true});
    const page: Page = await browser.newPage();
    console.log('Opening the browser...');

    await page.goto('https://automationexercise.com/', { waitUntil: 'domcontentloaded' });

    const loginSelector = 'a[href="/login"]';
    await page.waitForSelector(loginSelector);
    console.log('Clicking the login button...');
    await page.click(loginSelector);
    const args = process.argv.slice(2);
    const dummyEmail = args[0];
    const dummyPassword = args[1];
    // const dummyEmail = 'kavib31092@fenexy.com';
    // const dummyPassword = 'kavib31092@fenexy.com';

    const userEmailSelector = "input[type='email']";
    const userPasswordSelector = "input[type='password']";
    const submitButtonSelector = "button[type='submit']";

    await page.waitForSelector(userEmailSelector);
    await page.type(userEmailSelector, dummyEmail, { delay: 100 });
    await page.type(userPasswordSelector, dummyPassword, { delay: 100 });
    await page.click(submitButtonSelector);
    console.log('Logged in successfully.');

    for (let i = 1; i <= 12; i++) {
        if (![10, 9].includes(i)){
            let cartSelector = `a[data-product-id="${i}"]`;
            console.log(cartSelector);
            try {
            await page.waitForSelector(cartSelector, { timeout: 5000 });
            await page.click(cartSelector);
            console.log(`Clicked: ${cartSelector}`);
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
    console.log('Navigated to cart.');

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

    console.log(tableData);

    await browser.close();
})();
