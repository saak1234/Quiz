from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Initialize the WebDriver
driver = webdriver.Chrome()

# Function to log in (assuming there's a login process)
def login():
    driver.get("http://localhost:3000/TeacherSignIn")
    driver.find_element(By.ID, "email").send_keys("sid@gmail.com")
    driver.find_element(By.ID, "password").send_keys("1234")
    driver.find_element(By.XPATH, "//*[@id=\"form\"]/button").click()

# Navigate to the main page where quizzes are listed
def navigate_to_quizzes():
    driver.find_element(By.XPATH, "//*[@id=\"root\"]/div/div/div/div/a[3]").click()


# Function to delete a quiz
def delete_quiz(quiz_title):
    WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.CLASS_NAME, "container")))
    quizzes = driver.find_elements(By.CLASS_NAME, "bg-white")
    for quiz in quizzes:
        title_element = quiz.find_element(By.TAG_NAME, "h3")
        if title_element.text == quiz_title:
            delete_button = quiz.find_element(By.TAG_NAME, "button")
            delete_button.click()
            break

# Main execution function
def main():
    try:
        driver.implicitly_wait(5)
        login()
        navigate_to_quizzes()
        delete_quiz("Quiz Title Here")  # Replace with the actual title of the quiz to delete
        print("Quiz deleted successfully!")
    except Exception as e:
        print(f"An error occurred: {e}")
    finally:
        driver.quit()

if _name_ == "_main_":
    main()