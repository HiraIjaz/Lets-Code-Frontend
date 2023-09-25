function QuestionDetails({ question }) {
  return (
    <>
      {question.type === "coding" ? (
        <>
          <h5>Coding Question</h5>
          <h2>{question.title}</h2>
          <p>{question.data.question_text}</p>
          <h6>
            <strong>Test Cases:</strong>
          </h6>
          <ul>
            {question.data.public_test_cases.map((testCase, index) => (
              <li key={index}>
                Input: {testCase.input}, Output: {testCase.output}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <h5>Multple Choice Question</h5>
          <h2>{question.title}</h2>
          <p>{question.data.question_text}</p>
          <ul>
            {question.data.choices.map((choice, index) => (
              <li key={index}>
                <label>
                  <input
                    type="radio"
                    name={`mcq_${question.id}`}
                    value={choice}
                  />
                  {choice}
                </label>
              </li>
            ))}
            {/* <p>
              <br />
              <strong>Answer</strong>: {question.data.correct_answer}
            </p> */}
          </ul>
        </>
      )}
    </>
  );
}

export default QuestionDetails;
