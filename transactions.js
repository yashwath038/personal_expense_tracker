app.post('/transactions', async (req, res) => {
  try {
    const newTransaction = new Transaction(req.body)
    await newTransaction.save() // This will trigger Mongoose validation
    res.status(201).send(newTransaction) // Send created transaction
  } catch (error) {
    if (error.name === 'ValidationError') {
      // Handle validation errors
      return res.status(400).send({error: error.message})
    }
    res.status(500).send({error: 'Internal server error'}) // Generic server error
  }
})

app.get('/transactions/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id)
    if (!transaction) {
      return res.status(404).send({error: 'Transaction not found'}) // 404 if no transaction is found
    }
    res.send(transaction)
  } catch (error) {
    if (error.name === 'CastError') {
      // Handle invalid ObjectId (e.g., if an invalid ID format is passed)
      return res.status(400).send({error: 'Invalid transaction ID'})
    }
    res.status(500).send({error: 'Internal server error'})
  }
})

app.get('/transactions/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id)
    if (!transaction) {
      return res.status(404).send()
    }
    res.send(transaction)
  } catch (error) {
    res.status(500).send()
  }
})

app.put('/transactions/:id', async (req, res) => {
  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new: true, runValidators: true}, // Validate the update
    )
    if (!updatedTransaction) {
      return res.status(404).send({error: 'Transaction not found'})
    }
    res.send(updatedTransaction)
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).send({error: error.message}) // Handle validation errors
    }
    if (error.name === 'CastError') {
      return res.status(400).send({error: 'Invalid transaction ID'})
    }
    res.status(500).send({error: 'Internal server error'})
  }
})

app.delete('/transactions/:id', async (req, res) => {
  try {
    const deletedTransaction = await Transaction.findByIdAndDelete(
      req.params.id,
    )
    if (!deletedTransaction) {
      return res.status(404).send({error: 'Transaction not found'})
    }
    res.send(deletedTransaction)
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).send({error: 'Invalid transaction ID'})
    }
    res.status(500).send({error: 'Internal server error'})
  }
})

app.get('/summary', async (req, res) => {
  try {
    const transactions = await Transaction.find()
    let totalIncome = 0,
      totalExpenses = 0
    transactions.forEach(t => {
      if (t.type === 'income') totalIncome += t.amount
      else totalExpenses += t.amount
    })
    res.send({totalIncome, totalExpenses, balance: totalIncome - totalExpenses})
  } catch (error) {
    res.status(500).send()
  }
})

app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(400).json({error: err.message})
  }

  if (err.name === 'CastError') {
    return res.status(400).json({error: 'Invalid transaction ID'})
  }

  res.status(500).json({error: 'Internal server error'})
})
