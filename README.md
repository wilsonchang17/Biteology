# Biteology 🍽️  
**Solving the leftover ingredients problem, one recipe at a time!**

## Overview  
Biteology is a web application designed to help users turn leftover ingredients into delicious recipes. Whether you input ingredients manually, upload a picture of your fridge, or select a cuisine type, Biteology has you covered!  

---

## Features  

### **Main Features**  
1. **Ingredient-to-Recipe Conversion**:  
   Input leftover ingredients, and Biteology generates recipes tailored to your needs.  
2. **Photo Recognition**:  
   Upload a picture of your fridge, and the app identifies ingredients to create recipes.  
3. **Meal Type Selection**:  
   Choose whether you're cooking for breakfast, lunch, or dinner.  
4. **Cuisine Options**:  
   Select from a variety of cuisines like Thai, Japanese, or Chinese.  

### **Minimum Viable Product (MVP)**  
- **Front-End & Back-End**: A search bar for manual ingredient input.  
- **Photo Recognition**: Upload functionality to identify ingredients from images.  
- **Cuisine & Meal Buttons**: Select cuisine type and meal type.  
- **Recipe Output**: Generated recipes based on user input.  
- **Responsive Design (RWD)**: Works seamlessly across devices.  

### **Additional Features**  
1. **User Login**: Users can create accounts and log in.  
2. **Recipe History**: Save recipe history for each user (requires a database).  
3. **Sharing Recipes**: Share recipes via text or image with a share button.  

---

## Design

| Main Page (PC) | Main Page (Phone) |
|-----------------------------|------------------------------|
| ![Mainpage_PC](https://github.com/wilsonchang17/Biteology/blob/main/design/MainPage_PC.png) | ![Mainpage_Phone](https://github.com/wilsonchang17/Biteology/blob/main/design/MainPage_Phone.png) |

| Recipe Page (PC) | Recipe Page (Phone) |
|--------------------------------|--------------------------------|
| ![Recipepage_PC](https://github.com/wilsonchang17/Biteology/blob/main/design/RecipePage_PC.png) | ![Recipepage_Phone](https://github.com/wilsonchang17/Biteology/blob/main/design/Recipe_Phone.png) |

---

## Tech Stack  

| **Category**      | **Technology**      |  
|--------------------|---------------------|  
| **Front-End**      | React.js + CSS      |  
| **Back-End**       | Python (Flask)      |  
| **Database**       | MySQL               |  
| **LLM Integration**| LangChain           |  

---
# Setting Up the Project

Follow the steps below to set up and run the project locally:

## 1. Navigate to the Project Directory
```bash
cd backend
```

## 2. Create a Virtual Environment
```bash
python -m venv venv
```

## 3. Activate the Virtual Environment

**macOS/Linux:**
```bash
source venv/bin/activate
```

**Windows:**
```bash
venv\Scripts\activate
```

## 4. Install Dependencies
Install all the required Python packages using:
```bash
pip install -r requirements.txt
```

## 5. Run the Application
Start the application using:
```bash
python run.py
```
