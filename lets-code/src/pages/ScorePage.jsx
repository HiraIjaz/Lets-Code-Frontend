import { useLocation } from "react-router-dom";
import { CalculateDetailedScore } from "../utils";
import { Box, Typography, Paper, colors } from "@mui/material";

const backgroundImageUrl = "url('/your-background-image.jpg')"; // Replace with your background image URL

function ScorePage() {
  const location = useLocation();
  const result = CalculateDetailedScore(
    location.state.answers,
    location.state.questionList
  );

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#becce6",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: 4,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          maxWidth: "600px",
          width: "100%",
          backgroundColor: "rgba(212, 217, 226, 0.9)",
          borderRadius: "8px",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ color: "#007acc" }}
        >
          Score: {result.score}
        </Typography>
        <Typography variant="h4" gutterBottom sx={{ color: "#0b0a0a" }}>
          Total Questions: {result.correct_count + result.incorrect_count}
        </Typography>
        <Typography variant="h6" gutterBottom sx={{ color: "#4caf50" }}>
          Correct: {result.correct_count}
        </Typography>
        <Typography variant="h6" gutterBottom sx={{ color: "#f44336" }}>
          Incorrect: {result.incorrect_count}
        </Typography>
      </Paper>
    </Box>
  );
}

export default ScorePage;
