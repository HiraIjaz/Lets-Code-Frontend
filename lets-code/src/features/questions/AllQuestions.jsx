import Question from "../../components/Question";
import PropTypes from "prop-types";

function AllQuestions({ questionsList }) {
  if (!questionsList || !Array.isArray(questionsList)) {
    return null;
  }

  return (
    <div>
      <ul>
        {questionsList.map((question) => {
          if (question.type === "coding") {
            return <Question key={question.id} question={question} />;
          } else if (question.type === "mcq") {
            return <Question key={question.id} question={question} />;
          }
          return null;
        })}
      </ul>
    </div>
  );
}
AllQuestions.propTypes = {
  questionsList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    })
  ).isRequired,
};
export default AllQuestions;
