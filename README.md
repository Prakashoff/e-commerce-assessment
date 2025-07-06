# 🛒 E-Commerce Scraper Assessment

## 📌 About the Task

This project is an automated scraper built using **TypeScript** and **Playwright**. The scraper simulates user behavior on an e-commerce website and scrape the datapoints.

---

## 🔧 Task Flow

1. **Login**  
   The script logs into the e-commerce website using credentials (username and password).

2. **Add Products to Cart**  
   Once logged in, the script selects a few products and adds them to the cart via the "Add to Cart" buttons.

3. **Navigate to Cart**  
   After adding products, the script navigates to the shopping cart page to view the selected products.

4. **Final Scraping**  
   The script scrapes product details from the cart page, including:
   - Product Name
   - Price
   - Link

---

## 🎨 UI (streamlit)

Used streamlit in python for ui:
- Need to give the username and password
- Once given the valid username password need to use Login button
- It will trigger the ts script in the background

---

## 🛠️ Tech Stack

- **TypeScript** – main language
- **Playwright** – browser automation
- **Node.js** – runtime
- **Python 3.8+** – UI (streamlit)

---

## 📂 Project Structure

```bash
e-commerce-assessment/
├── node_modules/
├── src/
│   └── scraper.ts
├── package.json
├── package-lock.json
├── tsconfig.json
├── requirements.txt
├── README.md
```

---

## ✅ Credentials

- **Website** – https://automationexercise.com/
- **Username** – kavib31092@fenexy.com
- **Password** – kavib31092@fenexy.com

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/Prakashoff/e-commerce-assessment.git
cd e-commerce-assessment

**Direct Run**

# Install Node dependencies
npm install

# Install Playwright browser binaries
npx playwright install

# Run the TypeScript scraper
npx ts-node src/scraper.ts kavib31092@fenexy.com kavib31092@fenexy.com

**Run With Python**

# Install Python dependencies
pip install -r requirements.txt

# Run the Streamlit app
streamlit run ui.py

```
The UI will open locally



