import express from "express";
import cors from 'cors';
import pkg from "mongoose";
import Exam from "./src/models/Exam.js";
import Questions from "./src/json/questions.json" assert { type: 'json' };
import examRoutes from "./src/routes/examRoutes.js";
import "dotenv/config";

const { connect } = pkg;

const MONGODB = process.env.DB || "mongodb+srv://cristianpaez009:iXqtRJM1z2I27WPE@cluster0.aqgm9fo.mongodb.net/?retryWrites=true&w=majority"

const app = express();

const PORT =process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/exam', examRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

await connect(MONGODB);
console.log("MongoDB Connected");

// async function checkAndInsert() {
    // try {
      // const count = await Exam.countDocuments({});
  
      // if (count === 0) {
        // await Exam.insertMany(Questions);
        // console.log('Preguntas iniciales insertadas exitosamente.');
      // } else {
        // console.log('Ya existen preguntas en la base de datos.');
      // }
    // } catch (err) {
      // console.error('Error:', err);
    // }
// }
  
// checkAndInsert();
  

