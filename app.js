const express = require('express');
const cors = require('cors');
require('dotenv').config();


const { connectDataBase } = require('./config/db');
const authEndpoints = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use('/api/auth', authEndpoints); 

connectDataBase();
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});