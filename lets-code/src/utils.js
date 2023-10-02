export const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const mapPksToQuestions=(pkArray, allQuestions) => {
  return pkArray.map(pk => {
    const question = allQuestions.find(q => q.pk === pk);
    return question; 
  });
}
export const isQuestionSelected=(questionList, q) =>{
  return questionList.some((question) => question.id === q.id);
}

export const HEADERS = {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
};

