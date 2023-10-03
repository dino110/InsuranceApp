# Insurance Calculator App

The Insurance Calculator App is a basic full-stack application that allows users to enter customer data and calculate insurance prices based on various factors. This project is built using React, Node.js, MongoDB, and other technologies.

## Objective

The objective of this project is to develop a comprehensive insurance calculator application that provides the following features:

1. Users needs to enter customer data, including name, birthdate, city, and vehicle power. Voucer and price match are optional.
2. Users can select additional options and discounts to customize their insurance.
3. The insurance price is calculated on the backend based on the entered data, selected coverages, discounts, and additional options. The base price is calculated based on the city and age of the customer.
4. The application updates the sidebar and header sections dynamically:
   - Sidebar displays available coverages.
   - Header displays available discounts and the total price.
5. Price details are displayed below the main form.

## Technologies Used

### Backend

- Node.js with TypeScript for building the API.
- Express.js as the web app framework for Node.js.
- Axios as the HTTP client library.
- MongoDB (mongodb-memory-server) as database for storing insurance prices.
- Mongoose as MongoDB object modeling for Node.js.
- CORS for handling cross-origin resource sharing.
- axios-cache-interceptor as Interceptor for caching HTTP requests.
- http-errors as library for handling HTTP errors.

### Frontend

- React with TypeScript for building the user interface
- React Context as a state
- Axios as the HTTP client library
- MUI (Material-UI): UI component library for React.

## Installation and Setup

1. Clone the repository: git clone https://github.com/dino110/InsuranceApp.git
2. Navigate to the project directory: cd InsuranceApp
3. Install dependencies for the backend: cd backend && npm install
4. Install dependencies for the frontend: cd ../frontend && npm install

## Backend Usage

1. Start the backend server: cd backend && npm run dev
2. Send a POST request to http://localhost:4000/api/getPrice, where data with "customerData" (required), "discounts" and "coverages" is in the request body.
3. The API will calculate insurance prices and return a JSON response containing provided user data and calculated insurance prices and all discounts and coverages. For "basePrice" calculation is used city population given from the "https://api-ninjas.com/api/city" api.
4. Each caluclation is stored in database (mongodb-memory-server). Databese URI is logged on backend terminal. Use MongoDB Compass to access the database.

## Frontend Usage

1. Start the front-end application: cd frontend && npm run start.
2. Access the application in your web browser at http://localhost:3000.
3. Fill out the user form, select discounts and coverages and press "SAVE" button to submit the form and get insurance prices.
4. Insurance prices will be displayed bellow the customer data form. Also, "Total price" is displayed in the header.
5. Clicking on a discounts and coverages checkboxes will send (if customer form is valid) a new API request (with new data) to the backend and given new prices will be displayed.

## Contact

If you have any questions, suggestions, or feedback, please feel free to contact me at dino.kotaranin@gmail.com .
