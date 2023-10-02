import Question from "../../components/Question";
import PropTypes from "prop-types";

function AllCodingQuestions({ questionsList }) {
  return (
    <div style={{ width: "80%" }}>
      {questionsList.map((question) => {
        if (question.type === "coding") {
          return <Question key={question.id} question={question} />;
        } else {
          return null;
        }
      })}
    </div>
  );
}
AllCodingQuestions.propTypes = {
  questionsList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    })
  ).isRequired,
};
export default AllCodingQuestions;
