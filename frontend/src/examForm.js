import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExamForm = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState(Array(10).fill(''));

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/exam/questions');
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);
console.log(answers)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/exam/submit', {
        answers,
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error submitting exam:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {questions.map((question, index) => (
        <div key={index}>
          <p>{question.text}</p>
          {question.options.map((option, optionIndex) => (
            <label key={optionIndex}>
              <input
                type="radio"
                value={optionIndex}
                checked={answers[index] === optionIndex}
                onChange={() => {
                  const newAnswers = [...answers];
                  newAnswers[index] = optionIndex;
                  setAnswers(newAnswers);
                }}
              />
              {option}
            </label>
          ))}
        </div>
      ))}
      <button type="submit">Enviar Respuestas</button>
    </form>
  );
};

export default ExamForm;
