const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const todoRouter = require('./routes/todos');

dotenv.config();

console.log('MONGO_URI:', process.env.MONGO_URI);

const app = express();
app.use(cors());
app.use(express.json());

const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error('MongoDB connection string is missing. Please set MONGO_URI in your .env file.');
  process.exit(1);
}

mongoose.connect(mongoUri);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use('/todos', todoRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server Started on port ${port}`));
