# Anonymous Teacher Feedback System API

This is a REST API for an anonymous teacher feedback system designed for educational institutions. It allows students to submit feedback anonymously while ensuring participation is tracked without revealing identities. Teachers can view aggregated feedback.

## Features

-   **User Authentication:** Secure user registration and login using JWT and bcrypt.
-   **Role-Based Access Control:** Students can submit feedback, and teachers can view aggregated feedback.
-   **Anonymous Feedback Submission:** Students can submit feedback for specific sessions anonymously.
-   **Prevent Multiple Submissions:** Students are prevented from submitting multiple feedback entries for the same session.
-   **Feedback Aggregation:** Teachers can view aggregated feedback without accessing individual responses. 
-   **Participation Tracking:** Tracks who has and hasn't submitted feedback without linking responses to students.

## Technologies Used

| Technology        | Use|
|------------------|------------------------|
| **Node.js**      | Backend runtime for handling server-side operations. |
| **Express.js**   | Lightweight framework for building APIs with routing and middleware support. |
| **MongoDB**      | NoSQL database to store user data and feedback efficiently. |
| **Mongoose**     | ODM (Object Data Modeling) tool to interact with MongoDB using schemas. |
| **JWT (jsonwebtoken)** | Secure user authentication using token-based authorization. |
| **bcrypt**       | Hashing library to securely store passwords. |
| **cors**         | Enables Cross-Origin Resource Sharing for secure API access. |
| **dotenv**       | Loads environment variables from a `.env` file for configuration. |

## Prerequisites

-   Node.js and npm installed.
-   MongoDB installed and running.

## Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/VishalBhat07/anonymous-feedback.git
    cd anonymous-feedback
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Create a `.env` file in the root directory and add the following environment variables:**

    ```sh
    MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/feedbackDB
    JWT_SECRET=your_secret_key # Replace with a strong secret key
    PORT=5000 # Or any port you prefer
    ```

    * If you choose to use the default port and mongoURI, you may omit those from the .env file.
    * It is very important to replace `your_secret_key` with a very strong secret.

4.  **Start the server:**

    ```bash
    npm start
    ```

    The server will run on `http://localhost:5000` (or the port specified in your `.env` file).

## API Endpoints

### Authentication

-   **`POST /auth/register`**
    -   Registers a new user.
    -   Request body:

        ```json
        {
            "username": "your_username",
            "password": "your_password",
            "role": "student" or "teacher"
        }
        ```

    -   Response:

        ```json
        {
            "message": "User registered"
        }
        ```

-   **`POST /auth/login`**
    -   Logs in a user and returns a JWT.
    -   Request body:

        ```json
        {
            "username": "your_username",
            "password": "your_password"
        }
        ```

    -   Response:

        ```json
        {
            "token": "your_jwt_token"
        }
        ```

### Feedback

-   **`POST /feedback/submit`**
    -   Submits feedback for a session.
    -   Requires a valid JWT in the `Authorization` header.
    -   Only students can access this endpoint.
    -   Prevents students from submitting multiple feedback entries for the same session. [cite: 2]
    -   Request body:

        ```json
        {
            "sessionId": "session_id",
            "feedback": "your_feedback"
        }
        ```

    -   Response:

        ```json
        {
            "message": "Feedback submitted"
        }
        ```

-   **`GET /feedback/view`**
    -   Views aggregated feedback.
    -   Requires a valid JWT in the `Authorization` header.
    -   Only teachers can access this endpoint.
    -   Provides aggregated feedback without individual responses. [cite: 3]
    -   Response:

        ```json
        [
            {
                "sessionId": "session_id",
                "feedback": "feedback_text"
            },
            // ... more feedback entries
        ]
        ```



## Testing the API
You can test the API using:
1. **Postman**: Import the API endpoints and test authentication, feedback submission, and role-based access.
2. **cURL Commands**:
   - **Login & Get Token**
     ```sh
     curl -X POST http://localhost:5000/auth/login \
     -H "Content-Type: application/json" \
     -d '{"username": "test_student", "password": "password"}'
     ```
   - **Submit Feedback**
     ```sh
     curl -X POST http://localhost:5000/feedback/submit \
     -H "Content-Type: application/json" -H "Authorization: Bearer YOUR_TOKEN" \
     -d '{"sessionId": "session_123", "feedback": "Great lecture!"}'
     ```

## Authentication

-   All protected routes require a JWT in the `Authorization` header.
-   The JWT should be in the format `Bearer <token>`.

## Error Handling

-   The API returns appropriate HTTP status codes and JSON error messages for invalid requests and authentication failures.

## Implementation Notes

-   The system ensures anonymity by associating feedback with student IDs in a way that prevents direct linking of responses to students while still tracking participation.
-   The implementation focuses on security, clean API design, and efficiency. 
-   API testing can be done using POSTMAN.

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues.

