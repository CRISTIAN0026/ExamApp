import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  FormGroup,
  Paper,
  Box,
  Grid,
  Stack,
  Alert,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import ResultExam from "./resultExam";

const ExamForm = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState(Array(10).fill(""));
  const [showAlert, setShowAlert] = useState(false);
  const [results, setResults] = useState(false);
  const [state, setSate] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/exam/questions"
        );
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (answers.includes("")) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
      return;
    }
    setShowAlert(false);
    try {
      const response = await axios.post(
        "http://localhost:3001/api/exam/submit",
        {
          answers,
        }
      );
      setResults(response.data);
      setSate(true);
    } catch (error) {
      console.error("Error submitting exam:", error);
    }
  };

  return (
    <Box padding="16px" margin="20px">
      {showAlert && (
        <Stack sx={{ width: "100%" }}>
          <Alert severity="error">
            Por favor, responde a todas las preguntas antes de enviar.
          </Alert>
        </Stack>
      )}
      {!state && questions.length > 0 && (
        <Paper elevation={3}>
          <form
            style={{ margin: "16px", padding: "20px" }}
            onSubmit={handleSubmit}
          >
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h5" style={{ fontWeight: "bold" }}>
                Cultura general
              </Typography>
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginBottom: "10px", textTransform: "none" }}
            >
              Enviar respuestas
            </Button>
            <Grid container spacing={3}>
              {questions?.map((question, index) => (
                <Grid item xs={12} spacing={1} sm={6} md={4} key={index}>
                  <FormGroup key={index}>
                    <FormLabel style={{ fontWeight: "bold" }}>
                      {question.text}
                    </FormLabel>
                    <RadioGroup
                      value={answers[index]}
                      onChange={(event) => {
                        const newAnswers = [...answers];
                        newAnswers[index] = Number(event.target.value);
                        setAnswers(newAnswers);
                      }}
                    >
                      {question.options.map((option, optionIndex) => (
                        <FormControlLabel
                          key={optionIndex}
                          value={optionIndex}
                          control={<Radio />}
                          label={option}
                        />
                      ))}
                    </RadioGroup>
                  </FormGroup>
                </Grid>
              ))}
            </Grid>
            <Button
              style={{ textTransform: "none" }}
              type="submit"
              variant="contained"
              color="primary"
            >
              Enviar Respuestas
            </Button>
          </form>
        </Paper>
      )}
      {!state && questions?.length === 0 && (
        <Box
          sx={{
            display: "flex",
            width: "50h",
            height: "50vh",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {state && <ResultExam results={results} />}
      {showAlert && (
        <Stack sx={{ width: "100%" }}>
          <Alert severity="error">
            Por favor, responde a todas las preguntas antes de enviar.
          </Alert>
        </Stack>
      )}
    </Box>
  );
};

export default ExamForm;
