const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authEndpoints = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use('/users/auth', authEndpoints); 

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});