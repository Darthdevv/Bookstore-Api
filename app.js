import express from 'express';
import dotenv from 'dotenv';
import connectToMongoDB from './db/connection.js';

dotenv.config();
const app = express()
const PORT = process.env.PORT || 8000;

app.get('/', (req, res) => res.send('Hello World!'))


connectToMongoDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT} 📟`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB, server not started 🙍🏻‍♂️", error);
  });