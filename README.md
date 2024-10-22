# Personal Expense Tracker API

A RESTful API to manage personal financial records, allowing users to record income and expenses, retrieve past transactions, and get summaries by category or time period.

## Technologies Used

- **Backend**: Node.js with Express.js
- **Database**: SQLite or MongoDB (Mongoose)
- **Other**: Postman (for API testing)

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yashwath038/personal_expense_tracker.git
cd personal-expense-tracker
```

### 2. Install Dependencies

Ensure you have **Node.js** installed. Then, install the required packages by running:

```bash
npm install
```

### 3. Configure the Database

Depending on your choice of database, configure either SQLite or MongoDB.

- **For SQLite**: Ensure SQLite is installed, and a database file will be generated automatically.
- **For MongoDB**: Create a `.env` file with the MongoDB connection string:

```bash
MONGO_URI=mongodb://localhost:27017/expense-tracker
```

### 4. Start the Server

You can start the server using the following command:

```bash
npm start
```

By default, the server runs on `http://localhost:3000`.

---

## API Endpoints Documentation

### 1. **POST /transactions** - Add a new transaction

**Request**:
```http
POST /transactions
Content-Type: application/json
{
  "type": "income", // or "expense"
  "category": "salary",
  "amount": 1000,
  "description": "Salary for October"
}
```

**Response** (Success):
```json
{
  "id": 1,
  "type": "income",
  "category": "salary",
  "amount": 1000,
  "date": "2024-10-01T00:00:00Z",
  "description": "Salary for October"
}
```

---

### 2. **GET /transactions** - Retrieve all transactions

**Request**:
```http
GET /transactions
```

**Response** (Success):
```json
[
  {
    "id": 1,
    "type": "income",
    "category": "salary",
    "amount": 1000,
    "date": "2024-10-01T00:00:00Z",
    "description": "Salary for October"
  },
  {
    "id": 2,
    "type": "expense",
    "category": "groceries",
    "amount": 100,
    "date": "2024-10-02T00:00:00Z",
    "description": "Weekly groceries"
  }
]
```

---

### 3. **GET /transactions/:id** - Retrieve a transaction by ID

**Request**:
```http
GET /transactions/1
```

**Response** (Success):
```json
{
  "id": 1,
  "type": "income",
  "category": "salary",
  "amount": 1000,
  "date": "2024-10-01T00:00:00Z",
  "description": "Salary for October"
}
```

**Response** (Not Found):
```json
{
  "error": "Transaction not found"
}
```

---

### 4. **PUT /transactions/:id** - Update a transaction by ID

**Request**:
```http
PUT /transactions/1
Content-Type: application/json
{
  "amount": 1100,
  "description": "Updated salary"
}
```

**Response** (Success):
```json
{
  "id": 1,
  "type": "income",
  "category": "salary",
  "amount": 1100,
  "date": "2024-10-01T00:00:00Z",
  "description": "Updated salary"
}
```

---

### 5. **DELETE /transactions/:id** - Delete a transaction by ID

**Request**:
```http
DELETE /transactions/1
```

**Response** (Success):
```json
{
  "id": 1,
  "type": "income",
  "category": "salary",
  "amount": 1100,
  "date": "2024-10-01T00:00:00Z",
  "description": "Updated salary"
}
```

---

### 6. **GET /summary** - Get a summary of all transactions

**Request**:
```http
GET /summary
```

**Response** (Success):
```json
{
  "totalIncome": 1000,
  "totalExpenses": 500,
  "balance": 500
}
```

---

## Error Handling

- **400 Bad Request**: Invalid inputs or missing required fields
- **404 Not Found**: When a transaction with the given ID is not found
- **500 Internal Server Error**: For unexpected errors

---

## Postman Collection

Use Postman to test the API. You can import the Postman collection provided in this repository to run test cases easily.

### Postman API Screenshots

Include screenshots of Postman tests here. For example:

#### POST /transactions:
![POST Transaction](postman_screenshots/post_transactions.png)

#### GET /transactions:
![GET Transactions](postman_screenshots/get_transactions.png)

