// 

import express from "express";
import dotenv from 'dotenv';
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";

import connectDB from "./config/db.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


async function startServer() {
  try {
    const dbs = await connectDB();
    const quizCollection = dbs.connection.db.collection('quizzes');

    const quizModel = dbs.model('Quiz', new mongoose.Schema({
      question: String,
      options: [String],
      answer: String
    }));

    const quizQuestions = [
      {
        question: 'What is the capital of India',
        options: ['New Delhi', 'Mumbai', 'Kolkata', 'Bangalore'],
        answer: 'New Delhi'
      },
    ];

    await quizModel.create(quizQuestions);

    app.post('/api/execute-query', async (req, res) => {
      try {
        const query = req.body.query;
        const result = await quizCollection.find(query).toArray();
        res.json(result);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to execute query' });
      }
    });

    const port = process.env.PORT;
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.error(error);
  }
}

startServer();