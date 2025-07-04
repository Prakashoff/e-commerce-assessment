const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: false }); // brwser control
    const page = await browser.newPage();
    console.log('Opening the browser...');

    await page.goto('https://automationexercise.com/', { waitUntil: 'domcontentloaded' });

    const loginSelector = 'a[href="/login"]';
    await page.waitForSelector(loginSelector);
    console.log('Clicking the login button...');
    await page.click(loginSelector);

    
    const dummyEmail = 'kavib31092@fenexy.com';
    const dummyPassword = 'kavib31092@fenexy.com'; 
    
    const userEmailSelector = "input[type='email']"
    const userPasswordSelector = "input[type='password']"
    const submitButtonSelector = "button[type='submit']"

    await page.waitForSelector(userEmailSelector);
    await page.type(userEmailSelector, dummyEmail, { delay: 100 });
    await page.type(userPasswordSelector, dummyPassword, { delay: 100 });
    await page.click(submitButtonSelector);
    console.log('Logged in successfully.');

    const addToCartSelectors = [];
    for (let i = 1; i <= 12 && addToCartSelectors.length < 10; i++) {
        if (i !== 10) {
            addToCartSelectors.push(`a[data-product-id="${i}"]`);
        }
    }

    for (const selector of addToCartSelectors) {
        try {
            await page.waitForSelector(selector, { timeout: 5000 });
            await page.click(selector);
            console.log(`Clicked: ${selector}`);

            // Wait for and click "Continue Shopping" button in the modal popup
            const continueShoppingSelector = 'button[data-dismiss="modal"]';
            await page.waitForSelector(continueShoppingSelector, { timeout: 5000 });
            await page.click(continueShoppingSelector);
            // Add a short delay to allow modal to close
            // await page.waitForTimeout(1000);
        } catch (err) {
            console.error(`Failed to click ${selector}: ${err.message}`);
        }
    }

    
    const cartLinkSelector = 'a[href="/view_cart"]';
    await page.waitForSelector(cartLinkSelector);
    await page.click(cartLinkSelector);
    console.log('Navigated to cart.');

    // Wait for product names in the cart table
    await page.waitForSelector('td h4');

    // Extract product names, links, and prices
    const names = await page.$$eval('td h4', elements =>
        elements.map(el => el.textContent.trim())
    );
    
    const links = await page.$$eval('td h4 a', elements =>
        elements.map(el => el.href.trim())
    );

    const prices = await page.$$eval('td.cart_price p', elements =>
        elements.map(el => el.textContent.trim())
    );


    const productsJson = {
        names,
        links,
        prices
    };

    console.log('Product data in cart:', productsJson);

    await browser.close();
})();
