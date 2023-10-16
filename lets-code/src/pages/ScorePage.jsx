import { useLocation, useNavigate } from "react-router-dom";
import { CalculateDetailedScore } from "../utils";
import { Box, Typography, Paper, colors, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getCodingScore } from "../features/questions/questionSlice";
import { getUserEnrollments } from "../features/enrollments/enrollmentsSlice";
import { markEnrollment } from "../features/enrollments/enrollmentsSlice";
import { routes } from "../routes";
function ScorePage() {
  const codingScore = useSelector(getCodingScore);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const result = CalculateDetailedScore(
    location.state.answers,
    location.state.mcqquestionList,
    location.state.codingQuestionsCount,
    codingScore
  );

  const enrollments = useSelector(getUserEnrollments);
  const currentEnrollment = enrollments.find(
    (e) => e.assignment === parseInt(location.state.id)
  );
  function handleClick() {
    const updatedData = {
      ...currentEnrollment,
      status: "attempted",
      score: result.score,
    };
    dispatch(markEnrollment(updatedData)).then(() => {
      navigate(routes.userAssignments);
    });
  }

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
        <Button variant="contained" onClick={() => handleClick()}>
          Go Back
        </Button>
      </Paper>
    </Box>
  );
}

export default ScorePage;
