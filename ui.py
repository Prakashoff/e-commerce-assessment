import streamlit as st
import subprocess
import json
import os

USERNAME = "kavib31092@fenexy.com"
PASSWORD = "kavib31092@fenexy.com"

# Initialize session state
if "logged_in" not in st.session_state:
    st.session_state.logged_in = False


def login_page():
    st.title("🔐 Login Page")

    with st.form("login_form"):
        username = st.text_input("Username")
        password = st.text_input("Password", type="password")
        login_btn = st.form_submit_button("Login")

        if login_btn:
            if username == USERNAME and password == PASSWORD:
                st.session_state.logged_in = True
                st.success("✅ Login successful!")
            else:
                st.error("❌ Invalid username or password")


def main_app():
    st.title("🛠️ The Scraper UI")

    st.subheader("🔎 Output of the scraping in JSON format")

    st.write("✅ Scraped this link: [https://automationexercise.com/](https://automationexercise.com/)")

    st.markdown("### 🧭 Scraping Steps:")
    steps = [
        "1. Logged into the website",
        "2. Clicked login",
        "3. Entered username and password",
        "4. Added products to the 'cart page'",
        "5. Scraped data from the cart page",
        "6. Stored it into a JSON file"
    ]
    for step in steps:
        st.markdown(f"- {step}")

    st.markdown("### 📦 JSON Output:")

    # Get absolute path to scrape.ts safely
    ts_path = os.path.join(os.getcwd(), "src", "scrape.ts")

    # Build the command string
    cmd = f'ts-node "{ts_path}" {USERNAME} {PASSWORD}'

    # Run the scraper
    result = subprocess.run(
        cmd,
        capture_output=True,
        text=True,
        shell=True
    )

    # Extract JSON from stdout
    stdout = result.stdout.strip()
    json_start = stdout.find('[')
    if json_start != -1:
        json_str = stdout[json_start:]
        try:
            data = json.loads(json_str)
            st.success("✅ Scraper ran successfully!")
            st.json(data)
        except json.JSONDecodeError:
            st.error("❌ Failed to parse JSON.")
            st.code(json_str, language="text")
    else:
        st.error("❌ No JSON data found in output.")
        st.code(stdout, language="text")


# Main logic to show appropriate page
if st.session_state.logged_in:
    main_app()
else:
    login_page()