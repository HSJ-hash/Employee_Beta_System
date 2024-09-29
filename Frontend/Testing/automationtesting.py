from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
import time

# Define the path to chromedriver
service = Service('E:/Hesh ML Models/Nova Application/Beta/Frontend/Testing/chromedriver.exe')

# Initialize the Chrome webdriver with the service object
driver = webdriver.Chrome(service=service)

# URL of the login page
login_url = "http://localhost:3000/"

# Open the login page
driver.get(login_url)

# Wait for the page to load completely
time.sleep(3)

# Find the username and password fields and input the credentials
username_input = driver.find_element(By.NAME, "username")
password_input = driver.find_element(By.NAME, "password")

username_input.send_keys("Admin")
password_input.send_keys("Admin@1234")

# Find and click the submit button
submit_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Sign In')]")
submit_button.click()

# Wait to observe result after login
time.sleep(5)

# Close the browser
driver.quit()
