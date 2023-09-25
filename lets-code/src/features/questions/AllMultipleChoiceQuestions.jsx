import MultipleChoiceQuestion from "../../components/MultipleChoiceQuestion";
import PropTypes from "prop-types";

function AllMultipleChoiceQuestions({ questionsList }) {
  AllMultipleChoiceQuestions.propTypes = {
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
      {questionsList.map((question) => {
        if (question.type === "mcq") {
          return (
            <MultipleChoiceQuestion key={question.id} question={question} />
          );
        } else {
          return null;
        }
      })}
    </div>
  );
}

export default AllMultipleChoiceQuestions;
