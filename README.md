# Registration System

This is a full-stack registration system with a backend in Node.js and MySQL, and a frontend built using HTML, CSS, and JavaScript.

## Prerequisites

- Node.js and npm installed
- MySQL installed

## Backend Setup

1. Clone the repository:
   
    git clone https://github.com/patelsa54/INI8-LABS-PVT-LTD-Assignment.git
    cd registration-system/Backend

3. Install the backend dependencies:

    npm install

4. Configure .env file in the backend folder with the your own credentials:

    DB_HOST=localhost
    DB_USER=your_mysql_username
    DB_PASSWORD=your_mysql_password
    DB_DATABASE=registration_db

5. Start the backend server:

    node index.js

    The backend will run on http://localhost:3000

## Frontend Setup

1. Navigate to the frontend folder:

    cd ../Frontend

2. Open index.html in your browser.

3. Fill out the registration form and submit it. The data will be sent to the backend API.

##  API Endpoints
POST /register: Create a new registration.
GET /registrations: Retrieve all registrations.
GET /registration/:id: Retrieve a single registration by ID.
PUT /registration/:id: Update a registration by ID.
DELETE /registration/:id: Delete a registration by ID.


### **Running the Project**

- **Start the backend** by running `node index.js` in the `backend` folder.
- **Open `index.html`** in the browser to interact with the frontend form.
