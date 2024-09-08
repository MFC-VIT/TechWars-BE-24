export const getNQuestions = (quesCount, quesList)=>{
  if (quesCount >= quesList.length) return quesList;  // edge case
  const startIndex = Math.floor(Math.random()*quesCount);
  const questions = [];
  for (let i = startIndex; i < startIndex+quesCount; i++){
    const iterator = i >= quesList.length ? i - quesList.length : i;
    questions.push(quesList[iterator]);
  }
  return questions;
}

export const CustomError = (statusCode, message)=>{
  const error = new Error(message);
  error.status = statusCode;
  return error;
}