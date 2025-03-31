# Banka

Banka is a Node.js application that provides banking functionalities, including user authentication, account management, and transaction processing. It is designed to be a simple and efficient banking system for users to manage their accounts and transactions securely.

## Features

- User authentication (registration and login)
- Account management (create, view, update, delete accounts)
- Transaction processing (create, view, and manage transactions)
- Role-based access control for users
- Comprehensive API for integration with other services

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/garrisoncraft/bankAppApi.git
   ```
2. Navigate to the project directory:
   ```bash
   cd banka
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

## Usage

To start the application, run:
```bash
npm start
```

For development, use:
```bash
npm run dev
```

## API Endpoints

- **POST /auth/register**: Register a new user
- **POST /auth/login**: Log in an existing user
- **GET /accounts**: Retrieve all accounts for the authenticated user
- **POST /accounts**: Create a new account
- **GET /transactions**: Retrieve all transactions for the authenticated user
- **POST /transactions**: Create a new transaction

## Testing

To run the tests, use:
```bash
npm test
```

## Contributing

Contributions are welcome! Please follow these steps to contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## License

This project is licensed under the MIT License.
