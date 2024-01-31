import React from "react";
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
  Typography,
} from "@mui/material";

export default function ResultExam({ results }) {
  console.log(results);
  return (
    <Paper
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5fcff",
      }}
      elevation={3}
    >
      <Box style={{ margin: "16px", padding: "20px" }}>
        <Typography variant="h5" style={{ fontWeight: "bold" }}>
          Respuestas correctas: {results?.correctCount}
        </Typography>
        <Typography variant="h5" style={{ fontWeight: "bold" }}>
          Respuestas incorrectas: {results?.incorrectCount}
        </Typography>
        <Typography
          variant="h5"
          style={{ fontWeight: "bold", marginBottom: "10px" }}
        >
          Puntuación: {results?.finalGrade}
        </Typography>
        <Grid container spacing={3}>
          {results?.results?.map((question, index) => (
            <Grid item xs={12} spacing={1} sm={6} md={4} key={index}>
              <FormGroup key={index}>
                <FormLabel style={{ fontWeight: "bold" }}>
                  {question.question}
                </FormLabel>
                <RadioGroup value={question.correctAnswer}>
                  <FormControlLabel
                    key={question.questionIndex}
                    value={question.correctAnswer}
                    control={<Radio color="success" />}
                    label={
                      <Typography>
                        {question.correctAnswer}{" "}
                        <span style={{ fontWeight: "bold", color: "green" }}>
                          Correcta
                        </span>
                      </Typography>
                    }
                  />
                </RadioGroup>
                {question.correctAnswer !== question.userAnswer && (
                  <RadioGroup value={question.userAnswer}>
                    <FormControlLabel
                      key={question.userAnswer}
                      value={question.userAnswer}
                      control={<Radio color="error" />}
                      label={
                        <Typography>
                          {question.userAnswer}{" "}
                          <span style={{ fontWeight: "bold", color: "red" }}>
                            Incorrecta
                          </span>
                        </Typography>
                      }
                    />
                  </RadioGroup>
                )}
              </FormGroup>
            </Grid>
          ))}
        </Grid>
        <Button
          variant="contained"
          onClick={() => window.location.reload()}
          color="primary"
          style={{ marginBottom: "10px", textTransform: "none" }}
        >
          Responder de nuevo
        </Button>
      </Box>
    </Paper>
  );
}
