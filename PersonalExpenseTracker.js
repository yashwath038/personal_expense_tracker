const express = require('express')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const path = require('path')

const dbPath = path.join(__dirname, 'expenses.db')
const app = express()
app.use(express.json())

let db = null

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })
    app.listen(3000, () => {
      console.log('Server Running at http://localhost:3000/')
    })
  } catch (error) {
    console.log(`DB Error: ${error.message}`)
    process.exit(1)
  }
}

initializeDBAndServer()

// Create expenses table if not exists
app.get('/create-expenses-table', async (req, res) => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS expense (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      description TEXT,
      amount REAL,
      category TEXT,
      date TEXT
    );
  `
  await db.run(createTableQuery)
  res.send('Expenses table created successfully')
})

// Add a new expense
app.post('/expenses', async (req, res) => {
  const {description, amount, category, date} = req.body
  const addExpenseQuery = `
    INSERT INTO expense (description, amount, category, date)
    VALUES (?, ?, ?, ?);
  `
  await db.run(addExpenseQuery, [description, amount, category, date])
  res.status(200).send('Expense added successfully')
})

// Get all expenses
app.get('/expenses', async (req, res) => {
  const getExpensesQuery = `SELECT * FROM expense;`
  const expenses = await db.all(getExpensesQuery)
  res.status(200).json(expenses)
})

// Get an expense by ID
app.get('/expenses/:id', async (req, res) => {
  const {id} = req.params
  const getExpenseQuery = `SELECT * FROM expense WHERE id = ?;`
  const expense = await db.get(getExpenseQuery, [id])
  if (expense) {
    res.status(200).json(expense)
  } else {
    res.status(404).send('Expense not found')
  }
})

// Update an expense
app.put('/expenses/:id', async (req, res) => {
  const {id} = req.params
  const {description, amount, category, date} = req.body
  const updateExpenseQuery = `
    UPDATE expense
    SET description = ?, amount = ?, category = ?, date = ?
    WHERE id = ?;
  `
  const result = await db.run(updateExpenseQuery, [
    description,
    amount,
    category,
    date,
    id,
  ])
  if (result.changes === 0) {
    res.status(404).send('Expense not found')
  } else {
    res.status(200).send('Expense updated successfully')
  }
})

// Delete an expense
app.delete('/expenses/:id', async (req, res) => {
  const {id} = req.params
  const deleteExpenseQuery = `DELETE FROM expense WHERE id = ?;`
  const result = await db.run(deleteExpenseQuery, [id])
  if (result.changes === 0) {
    res.status(404).send('Expense not found')
  } else {
    res.status(200).send('Expense deleted successfully')
  }
})

// Exporting the Express instance as a default export
module.exports = app
