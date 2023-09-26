// app.js

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); // Add path module
const sequelize = require('./config');
const expenseController = require('./controllers/expenseController');
const Expense = require('./models/Expense');
const cors = require('cors');
const { Model } = require('sequelize');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
// Connect routes
app.use('/api', expenseController);

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Define a route to render an HTML page when accessing the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// Connect to the database and start the server
sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
  });
