import ExamForm from "./components/examForm";
import { Typography, Box } from "@mui/material";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h2" fontWeight="bold">
          ExamApp
        </Typography>
      </Box>
      <Routes>
        <Route path="/" element={<ExamForm />} />
        <Route path="*" element={<div><h1>No existe esta pagina</h1></div>} />
      </Routes>
    </div>
  );
}

export default App;
