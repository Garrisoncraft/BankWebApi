# BankApp

## Overview

BankApp is a full-stack web application that provides banking functionalities, including user authentication, account management, and transaction processing. It offers a secure and efficient platform for users to manage their finances. The application features role-based access control, ensuring that different user roles (admin, staff, client) have appropriate permissions.

## Features

*   **User Authentication:** Secure registration, login, and password reset functionality using JWT and bcryptjs. Includes OTP verification via email.
*   **Account Management:** Users can create, view, update, and delete accounts based on their roles.
*   **Transaction Processing:** Support for creating, viewing, and managing transactions.
*   **Role-Based Access Control:** Different dashboards and functionalities for admin, staff, and client roles.
*   **Audit Logging:** Tracks user activities for security and compliance.
*   **Contact Form:** Allows users to submit inquiries and feedback via email.
*   **Terms of Use and Privacy Policy:** Provides legal information for users.
*   **Security:** Implements CSRF protection, rate limiting, and password strength checking.

## Technologies Used

### Backend

*   **Node.js:** JavaScript runtime environment.
*   **Express:** Web application framework.
*   **MongoDB:** NoSQL database.
*   **Mongoose:** MongoDB object modeling tool.
*   **JSON Web Tokens (JWT):** For user authentication.
*   **bcryptjs:** For password hashing.
*   **nodemailer:** For sending emails (OTP, contact form).
*   **express-validator:** For request validation.
*   **cors:** For enabling Cross-Origin Resource Sharing.
*   **csurf:** For Cross-Site Request Forgery protection.
*   **express-rate-limit:** For rate limiting API requests.
*   **dotenv:** For managing environment variables.
*   **Jest:** Testing framework.
*   **Supertest:** HTTP assertion library.
*   **MongoDB Memory Server:** In-memory MongoDB instance for testing.

### Frontend

*   **React:** JavaScript library for building user interfaces.
*   **Vite:** Build tool for fast development.
*   **@mui/material:** UI component library.
*   **@mui/icons-material:** Material Design icons.
*   **js-cookie:** For managing cookies (e.g., CSRF token).
*   **lucide-react:** React icons.
*   **react-csv:** For downloading data as CSV files (e.g., transactions, audit logs).
*   **react-router-hash-link:** For routing within the application.
*   **zxcvbn:** Password strength estimation.
*   **ESLint:** JavaScript linter.

## File Structure

```
BankApp/
├── banka/
│   ├── backend/
│   │   ├── models/              # MongoDB models (User, Account, Transaction, OTP, AuditLog)
│   │   ├── routes/              # API routes (auth, accounts, transactions, users, auditLogs, contact)
│   │   ├── middleware/          # Middleware functions (auth, auditLog)
│   │   ├── services/            # Utility services (emailService)
│   │   ├── test/                # Backend tests
│   │   ├── server.js            # Main server file
│   │   ├── package.json         # Backend dependencies
│   │   └── README.md            # Backend README
│   ├── frontend/
│   │   ├── src/
│   │   │   ├── components/      # React components (auth, common, dashboards, admin)
│   │   │   ├── context/         # React context (AuthContext)
│   │   │   ├── pages/           # React pages (HomePage, About, etc.)
│   │   │   ├── services/        # API services (api.js)
│   │   │   ├── utils/           # Utility functions (validationSchemas)
│   │   │   ├── assets/          # Static assets (images)
│   │   │   ├── App.jsx          # Main application component
│   │   │   ├── main.jsx         # Entry point for the React application
│   │   │   └── index.css        # Global styles
│   │   ├── public/              # Public assets (Logo, PDF documents)
│   │   ├── package.json         # Frontend dependencies
│   │   ├── vite.config.js       # Vite configuration
│   │   └── README.md            # Frontend README
│   ├── .env                   # Environment variables (shared or specific to backend/frontend)
│   └── .gitignore             # Specifies intentionally untracked files that Git should ignore
├── package-lock.json          # Records the exact versions of dependencies
└── package.json               # Lists project dependencies and scripts (if any at root)
```

## Setup Instructions

1.  **Clone the repository:**

    ```bash
    git clone <repository_url> # Replace <repository_url> with the actual URL
    cd BankApp
    ```
2.  **Backend Setup:**

    ```bash
    cd banka/backend
    npm install
    ```
3.  **Configure Environment Variables:**

    *   Navigate to the `banka` directory (`cd ..`).
    *   Create a `.env` file in the `banka` directory (or separate `.env` files in `backend` and `frontend` if needed).
    *   Add the following environment variables:

        ```dotenv
        # Backend Configuration
        MONGODB_URI=<your_mongodb_connection_string>
        JWT_SECRET=<your_strong_jwt_secret>
        EMAIL_USER=<your_email_address>
        EMAIL_PASS=<your_email_password_or_app_password>
        PORT=5000 # Or your desired backend port
        BASE_URL=http://localhost:3000 # Or your frontend URL

        # Frontend Configuration (if using a separate .env in frontend)
        # VITE_API_BASE_URL=http://localhost:5000 # Or your backend URL
        ```
    *   **Note:** Ensure your email provider allows sending emails via SMTP and configure security settings (like "less secure app access" for Gmail, though using app passwords is recommended).

4.  **Run the Backend Server:**

    ```bash
    # From the banka/backend directory
    npm run dev
    ```
    The backend server should now be running (typically on port 5000).

5.  **Frontend Setup:**

    ```bash
    # Open a new terminal or navigate back
    cd ../frontend
    npm install
    ```
6.  **Run the Frontend Development Server:**

    ```bash
    # From the banka/frontend directory
    npm run dev
    ```
    The frontend development server should now be running (typically on port 3000 or the next available port). Open your browser to the specified address.

## Deployment

*   **GitHub:** Push your code to a GitHub repository for version control and collaboration.
    ```bash
    git remote add origin https://github.com/Garrisoncraft/Bank-web-app.git
    git branch -M main
    git push -u origin main
    ```
*   **Vercel (Frontend):**
    1.  Sign up or log in to [Vercel](https://vercel.com/).
    2.  Import your GitHub repository.
    3.  Configure the project settings:
        *   **Framework Preset:** Vite
        *   **Root Directory:** `banka/frontend`
        *   **Build Command:** `npm run build`
        *   **Output Directory:** `dist`
        *   Add necessary environment variables (e.g., `VITE_API_BASE_URL` pointing to your deployed backend).
    4.  Deploy.
*   **Backend Deployment (Example: Render):**
    1.  Sign up or log in to a backend hosting provider like [Render](https://render.com/).
    2.  Create a new "Web Service".
    3.  Connect your GitHub repository.
    4.  Configure the service settings:
        *   **Root Directory:** `banka/backend`
        *   **Build Command:** `npm install`
        *   **Start Command:** `npm start`
        *   Add necessary environment variables ( `MONGODB_URI`, `JWT_SECRET`, `EMAIL_USER`, `EMAIL_PASS`, `BASE_URL` pointing to your deployed frontend).
    5.  Deploy.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/YourFeature`).
3.  Make your changes and commit them (`git commit -m 'Add some feature'`).
4.  Push to the branch (`git push origin feature/YourFeature`).
5.  Open a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
