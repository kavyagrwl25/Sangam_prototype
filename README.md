
🤝 SANGAM Alumni Networking Platform Prototype
SANGAM (Alumni-Student Engagement Platform) is a pro
totype built using React and styled with Bootstrap 5. It simulates a professional networking site that connects students with alumni mentors based on skill compatibility.

✨ Features
Role-Based Authentication: Users can log in as Student, Alumni, or Admin.

Skill Matching: The Dashboard uses a memoized function to match the user's profile skills (e.g., React, Node.js) against mock alumni data, displaying a compatibility score.

Dynamic Profile: Students can edit their skills and profile information, instantly updating mentorship matches.

Routing: Simple routing implemented to showcase different modules: Dashboard, Chat, and Events.

Bootstrap Styling: Fully styled using Bootstrap 5 classes for responsive design.

🚀 Setup and Installation
This project assumes you have a Node.js environment and a package manager (npm or yarn).

1. Project Initialization (if starting fresh)
Bash

# Using Vite (Recommended)
npm create vite@latest sangam-app -- --template react
cd sangam-app
2. Install Dependencies
The project requires React, ReactDOM, and Bootstrap:

Bash

npm install react react-dom bootstrap
3. Place Source Code
Create a file named src/Sangam.jsx and paste the main component code into it.

Update your application entry point (src/main.jsx or src/index.js) to import and render Sangam.

4. Include Bootstrap CSS
In your main entry file (src/main.jsx):

JavaScript

// src/main.jsx
// ... other imports
import 'bootstrap/dist/css/bootstrap.min.css'; 
// ...
5. Run the Application
Bash

npm run dev
The application will open in your browser, starting with the Welcome/Login screen.

💻 Tech Stack
Frontend: React (Hooks: useState, useMemo, useEffect)

Styling: Bootstrap 5 (via npm package or CDN)

Build Tool: Vite (configured via package.json)

Language: JavaScript (ES6+)

📝 Usage Notes
Login: To access the dashboard, select a role (e.g., Student) and click the Login button. No actual credentials are required.

Matching Logic: Match scores are calculated by comparing skills in the user's profile against the hardcoded mockAlumni array.

Profile Editing: Use the Edit Profile button to change the student's name, headline, and skills. The matches will update immediately upon saving.
