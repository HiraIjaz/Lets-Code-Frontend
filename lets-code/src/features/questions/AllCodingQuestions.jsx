import CodingQuestion from "../../components/CodingQuestion";
import PropTypes from "prop-types";

function AllCodingQuestions({ questionsList }) {
  AllCodingQuestions.propTypes = {
    questionsList: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
      })
    ).isRequired,
  };
  return (
    <div style={{ width: "80%" }}>
      {questionsList.map((question) => {
        if (question.type === "coding" && question.isDeleted === "false") {
          return <CodingQuestion key={question.id} question={question} />;
        } else {
          return null;
        }
      })}
    </div>
  );
}

export default AllCodingQuestions;
