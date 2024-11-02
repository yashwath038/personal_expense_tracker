# Personal Expense Tracker API

A simple Node.js and Express-based API for managing personal expenses, with an SQLite database for data storage. This API allows users to add, view, update, and delete expenses, making it a helpful tool for tracking personal finances.

## Features

- **Add Expense**: Record a new expense with details like description, amount, category, and date.
- **View Expenses**: Retrieve a list of all expenses or a single expense by ID.
- **Update Expense**: Modify existing expense details.
- **Delete Expense**: Remove an expense from the tracker.
- **SQLite Database**: Data is stored in an SQLite database file for easy management and portability.

## Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or above)
- [SQLite3](https://sqlite.org/) installed locally

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/Personal-Expense-Tracker.git
   cd Personal-Expense-Tracker
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Setup SQLite Database**:
   - Ensure `sqlite3` is installed.
   - Create a new file `expenses.db` in the root directory or use the `/create-expenses-table` endpoint to automatically create the required table in the database.

4. **Run the Application**:
   ```bash
   node app.js
   ```

   The server will start at `http://localhost:3000/`.

## API Endpoints

### Create Expenses Table
- **Endpoint**: `/create-expenses-table`
- **Method**: `GET`
- **Description**: Sets up the `expenses` table in the SQLite database if it doesn't already exist.

### Add Expense
- **Endpoint**: `/expenses`
- **Method**: `POST`
- **Body Parameters**:
  - `description` (string): Description of the expense.
  - `amount` (number): Expense amount.
  - `category` (string): Category of the expense (e.g., food, transport).
  - `date` (string): Date of the expense in `YYYY-MM-DD` format.
- **Response**: `Expense added successfully` on success.

### Get All Expenses
- **Endpoint**: `/expenses`
- **Method**: `GET`
- **Description**: Retrieves all expense records.
- **Response**: Array of expense objects.

### Get Expense by ID
- **Endpoint**: `/expenses/:id`
- **Method**: `GET`
- **Description**: Retrieves a single expense by its ID.
- **Response**: Expense object or `Expense not found`.

### Update Expense
- **Endpoint**: `/expenses/:id`
- **Method**: `PUT`
- **Body Parameters**:
  - `description` (string): Updated description of the expense.
  - `amount` (number): Updated amount.
  - `category` (string): Updated category.
  - `date` (string): Updated date in `YYYY-MM-DD` format.
- **Response**: `Expense updated successfully` on success or `Expense not found`.

### Delete Expense
- **Endpoint**: `/expenses/:id`
- **Method**: `DELETE`
- **Description**: Deletes an expense by its ID.
- **Response**: `Expense deleted successfully` on success or `Expense not found`.

## Project Structure

```plaintext
.
├── app.js            # Main application file
├── expenses.db       # SQLite database file
└── README.md         # Project documentation
```

## Technologies Used

- **Node.js**: JavaScript runtime
- **Express.js**: Web framework for building APIs
- **SQLite3**: Lightweight SQL database engine
- **bcrypt**: Library for hashing passwords (if user authentication is added in the future)

## Future Enhancements

- **User Authentication**: Secure login and signup for multiple users.
- **Enhanced Expense Categories**: Add predefined categories and subcategories.
- **Data Visualization**: Charts and graphs for better insights into spending patterns.

## License

This project is licensed under the MIT License. Please look at the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or feedback, please feel free to reach out.

---

**Thank you for using the Personal Expense Tracker API! Happy tracking!**

### Notes:
1. Replace `your-username` in the `git clone` command with your GitHub username.
2. This `README.md` assumes basic usage and provides a helpful overview of the API’s functionality and setup process.
