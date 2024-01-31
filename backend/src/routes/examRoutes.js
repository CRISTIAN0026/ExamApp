import { Router } from "express";
import Exam from "../models/Exam.js";
const router = Router();

router.post("/submit", async (req, res) => {
  try {
    const sampleExam = await Exam.find();
    const userAnswers = req.body.answers;

    const results = userAnswers.map((userAnswer, index) => {
      const correctAnswer = sampleExam[index].correctOptionIndex;
      return {
        questionIndex: index,
        question: sampleExam[index].text,
        userAnswer: sampleExam[index].options[userAnswer],
        correctAnswer: sampleExam[index].options[correctAnswer],
        isCorrect: userAnswer === correctAnswer,
      };
    });

    const correctCount = results.filter((result) => result.isCorrect).length;
    const finalGrade =
      ((correctCount / userAnswers.length) * 100).toFixed(2) + "%";

    res.json({
      results,
      correctCount,
      incorrectCount: userAnswers.length - correctCount,
      finalGrade,
    });
  } catch (error) {
    console.error("Error processing exam:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/questions", async (req, res) => {
  try {
    const result = await Exam.find();
    res.json(result);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
