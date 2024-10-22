const transactionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['income', 'expense'], // Only allow "income" or "expense"
    required: [true, 'Transaction type is required'],
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [0, 'Amount must be a positive number'], // Prevent negative values
  },
  date: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
  },
})
