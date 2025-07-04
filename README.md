# 🛒 E-Commerce Scraper Assessment

## 📌 About the Task

This project is an automated scraper built using **TypeScript** and **Puppeteer**. The scraper simulates user behavior on an e-commerce website and completes the full cart workflow.

---

## 🔧 Task Flow

1. **Login**  
   The script logs into the e-commerce website using predefined credentials (username and password).

2. **Add Products to Cart**  
   Once logged in, the script selects a few products and adds them to the cart via the "Add to Cart" buttons.

3. **Navigate to Cart**  
   After adding products, the script navigates to the shopping cart page to view the selected products.

4. **Final Scraping**  
   The script scrapes product details from the cart page, including:
   - Product Name
   - Price
   - Quantity

---

## 🎨 UI (Optional Enhancement)

A minimal UI is planned (or integrated) that allows:
- Logging in using a web form
- Triggering the scraper process from the frontend
- Displaying the scraped product details visually

---

## 🛠️ Tech Stack

- **TypeScript** – main language
- **Puppeteer** – browser automation
- **Node.js** – runtime
- **UI (optional)**

---

## 📂 Project Structure

```bash
e-commerce-assessment/
├── node_modules/
├── src/
│   └── scraper.ts
├── package.json
├── tsconfig.json
├── README.md
```

---

## ✅ Demo Credentials

- **Website** – https://automationexercise.com/
- **Username** – kavib31092@fenexy.com
- **Password** – kavib31092@fenexy.com

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/Prakashoff/e-commerce-assessment.git
cd e-commerce-assessment

# Install dependencies
npm install

# Run the scraper
npx ts-node src/scraper.ts



