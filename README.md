# NASA API Project

Use this link to access live site - <a href="https://nasa-api-chillbroh.netlify.app/">NASA API</a>

This project utilizes NASA APIs to display astronomy pictures of the day (APOD) and images taken by Mars rovers.

Clone the repository:
   ```bash
   git clone https://github.com/sliitcsse/se3040-assignment02-ChillBroh.git
   ```
## Table of Contents

- [Setup Instructions Frontend](#setup-instructions-frontend)
- [Setup Instructions Backend](#setup-instructions-backend)
- [Technologies Used](#technologies-used)
- [Folder Structure](#folder-structure)
- [Testing](#testing)

## Setup Instructions Frontend

1. Navigate to the frontend directory :
   ```bash
   cd frontend
   ```
2. Install dependencies :
   ```bash
   npm install
   ```
3. Run frontend :
   ```bash
   npm start
   ```
   
## Setup Instructions Backend

1. Navigate to the backend directory :
   ```bash
   cd backend
   ```
2. Install dependencies :
   ```bash
   npm install
   ```
3. add .env file with below details to root folder  (add your details) :
   ```bash
   MONGO_URI = ""
   JWT_SECRET = ""
   NODE_ENV = "development"
   JWT_EXPIRES_IN = "30d"
   PORT = 
   APP_URL = http://localhost:3000
   ```
4. Run backend :
   ```bash
   npm start
   ```
## Technologies Used

- **React.js**: A JavaScript library for building user interfaces.
- **Ant Design**: A React UI library with a set of high-quality components and demos for building rich, interactive user interfaces
- **Node.js**: JavaScript runtime for building the server-side application.
- **Express.js**: Web application framework for building RESTful APIs.
- **MongoDB**: NoSQL database for storing timetable, course, user, and resource data.
- **JWT**: JSON Web Tokens for secure authentication.
- **Postman**: API development and testing tool for interacting with the endpoints.
- **Jest**: Testing frameworks for unit and integration testing.

## Folder Structure

1. Backend
![sample screenshot](https://github.com/sliitcsse/se3040-assignment02-ChillBroh/blob/main/screenshots/backend.png)

2. Frontend
![sample screenshot](https://github.com/sliitcsse/se3040-assignment02-ChillBroh/blob/main/screenshots/frontend.png)

## Testing

1. **Run Test Cases** 
   ```bash
   npm test
