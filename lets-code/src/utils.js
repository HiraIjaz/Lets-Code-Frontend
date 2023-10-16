export const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
export const isQuestionSelected=(questionList, q) =>{
  return questionList.some((question) => question.id === q.id);
}

export const HEADERS = {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
};

export const CalculateScore=(answerslist, questionsList) =>{
  let score = 0;

  for (const answer of answerslist) {
    const question = questionsList.find((q) => q.id === answer.questionId);
    if (question && answer.answer === question.data.correct_answer) {
      score += 5;
    }
  }

  return score;
}
export const CalculateDetailedScore=(answerslist, questionsList, codingQcount, codingScore) =>{
  let score = 0;
  let correct_count=0;
  let incorrect_count = 0
  let correct_count_coding=0
  console.log(codingQcount)

  for (const answer of answerslist) {
    const question = questionsList.find((q) => q.id === answer.questionId);
    if (question && answer.answer === question.data.correct_answer) {
      score += 5;
      correct_count+=1;
    }
    else{
      incorrect_count+=1;
    }
  }
  score+= codingScore
  if (codingScore>0)
    {
      correct_count_coding+= codingScore/10
      incorrect_count+= codingQcount- correct_count_coding
  }
  else
    {incorrect_count+= codingQcount}
  correct_count+= correct_count_coding

  return { score, correct_count,incorrect_count};
}
