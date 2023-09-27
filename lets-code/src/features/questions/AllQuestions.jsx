import CodingQuestion from "../../components/CodingQuestion";
import MultipleChoiceQuestion from "../../components/MultipleChoiceQuestion";
import PropTypes from "prop-types";

function AllQuestions({ questionsList }) {
  if (!questionsList || !Array.isArray(questionsList)) {
    return null;
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
  return (
    <div>
      <ul>
        {questionsList.map((question) => {
          if (question.isDeleted === false) {
            if (question.type === "coding") {
              return <CodingQuestion key={question.id} question={question} />;
            } else if (question.type === "mcq") {
              return (
                <MultipleChoiceQuestion key={question.id} question={question} />
              );
            }
            return null;
          }
        })}
      </ul>
    </div>
  );
}

export default AllQuestions;
