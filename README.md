# Basic Quiz App (HTML & CSS)

## Description
The **Basic Quiz App** is a simple command-line or web-based application that tests users on their knowledge of **HTML and CSS**. After completing the quiz, the user's score, name, and timestamp are stored in a text file for record-keeping.

## Features
- Multiple-choice or short-answer questions on HTML and CSS.
- Stores user scores along with their name and timestamp.
- Simple and lightweight, suitable for beginners.
- Built using **HTML, CSS, and JavaScript**, with file handling via **Node.js (optional for server-side storage)**.

## Technologies Used
- **Frontend:** HTML, CSS, JavaScript
- **Backend (Optional):** Node.js (for storing scores in a text file)
- **File Storage:** Plain text file (scores.txt)

## Installation & Setup
### Option 1: Running as a Standalone Web App (Without Backend)
1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/quiz-app.git
   cd quiz-app
   ```
2. Open `index.html` in a browser to start the quiz.

### Option 2: Running with Node.js (For Storing Scores)
1. Ensure you have **Node.js** installed.
2. Navigate to the project directory and install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   node server.js
   ```
4. Access the quiz by opening `index.html` in a browser.

## Usage
1. Answer the multiple-choice or short-answer questions.
2. Submit your responses to see your score.
3. Your name, score, and timestamp are stored in `scores.txt`.

## File Structure
```
quiz-app/
│-- index.html   # Main quiz interface
│-- styles.css   # Styling for the quiz
│-- script.js    # Quiz logic and event handling
│-- server.js    # Node.js script for saving scores (optional)
│-- scores.txt   # Stores user scores, names, and timestamps
│-- README.md    # Project documentation
```

## Example Score Entry in `scores.txt`
```
John Doe - 80% - 2025-03-03 14:30:00
Jane Smith - 90% - 2025-03-03 15:45:00
```

## Future Enhancements
- Add a leaderboard to display high scores.
- Implement a database (MongoDB or Firebase) for better data management.
- Enhance UI with animations and progress indicators.

## License
This project is licensed under the MIT License.

## Author
Developed by Gobika R.

