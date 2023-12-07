// index.js

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost/money_tracker_app', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', (error) => console.error(error));
mongoose.connection.once('open', () => console.log('Connected to MongoDB'));

// Routes
// Add your routes here

// index.js
const transactionsRouter = require('/routes/transactions');
app.use('/transactions', transactionsRouter);
// ... (existing code
// Routes


// ... (existing code)


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
