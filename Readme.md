### Sleep Tracker API
The Sleep Tracker API is a backend application for tracking sleep records of users. It allows users to create accounts, add sleep records, retrieve sleep records, and delete sleep records.

# Setup
Prerequisites: 
Before running the API, ensure you have the following installed:

Node.js
MongoDB


# Installation
Clone the repository:
git clone <https://github.com/ankush170/sleep_tracker>

Install deprlendencies:

cd sleep_tracker
npm install


Configure environment variables:
Create a .env file in the root directory and provide the variables mentioned in the .env.sample file. Make sure to replace the <password> with your own mongoDB password.

Start the server:

npm run dev

the application is now running on http://localhost:8000

# Endpoints
1. Create a new user
URL: /api/sleep/users
Method: POST
Request Body:

{
  "username": "example_username"
}


Success Response:
Code: 201 CREATED


Content:

{
  "status": 201,
  "data": {
    "_id": "user_id",
    "username": "example_username",
    "sleepRecord": [],
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  },
  "message": "User created successfully"
}


Error Response:
Code: 400 BAD REQUEST

Content: { "message": "Error creating user: error_message" }


2. Add a sleep record for a user

URL: /api/sleep
Method: POST
Request Body:
{
  "userId": "user_id",
  "duration": 360, // Sleep duration in minutes
  "timestamp": "YYYY-MM-DDTHH:MM:SSZ" // ISO 8601 format
}

Success Response:
Code: 201 CREATED

Content:
{
  "status": 200,
  "data": {
    "_id": "sleep_record_id",
    "user": "user_id",
    "duration": 360,
    "timestamp": "timestamp",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  },
  "message": "Sleep record created successfully"
}

Error Response:
Code: 400 BAD REQUEST

Content: { "message": "Error creating sleep record" }


3. Get all sleep records for a user

URL: /api/sleep/:userId
Method: GET
URL Params:
userId: ID of the user
Success Response:
Code: 200 OK
Content:
{
  "status": 200,
  "data": [
    {
      "_id": "sleep_record_id",
      "user": "user_id",
      "duration": 360,
      "timestamp": "timestamp",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
  ],
  "message": "Sleep records for user fetched successfully"
}

Error Response:
Code: 404 NOT FOUND
Content: { "message": "User not found" }


4. Delete a sleep record by ID

URL: /api/sleep/:recordId
Method: DELETE
URL Params:
recordId: ID of the sleep record
Success Response:
Code: 200 OK
Content: { "status": 200, "message": "Sleep record deleted successfully" }


Error Response:
Code: 404 NOT FOUND
Content: { "message": "Sleep record not found" }



# Testing

To run tests:

npm run test