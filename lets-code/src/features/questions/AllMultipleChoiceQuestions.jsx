import Question from "../../components/Question";
import PropTypes from "prop-types";

const AllMultipleChoiceQuestions = ({ questionsList }) => {
  return (
    <div>
      {questionsList.map((question) => {
        if (question.type === "mcq") {
          return <Question key={question.id} question={question} />;
        } else {
          return null;
        }
      })}
    </div>
  );
};
AllMultipleChoiceQuestions.propTypes = {
  questionsList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    })
  ).isRequired,
};
export default AllMultipleChoiceQuestions;
