

export const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const mapPksToQuestions=(pkArray, allQuestions) => {
  return pkArray.map(pk => {
    const question = allQuestions.find(q => q.pk === pk);
    return question; 
  });
}