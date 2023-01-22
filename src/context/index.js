import { createContext } from "react";

export const ExamContext = createContext({
  total: 0,
  setTotal: (newTotal) => {},
  questionNumber: 0,
  setQuestionNumber: (newQuestionNumber) => {},
  started: 0,
  setStarted: (newStarted) => {},
  correctAwnsers: 0,
  setCorrectAwnsers: (newCorrectAwnsers) => {},
  incorrectAwnsers: 0,
  setIncorrectAwnsers: (newIncorrectAwnsers) => {},
  passMark: 0,
  setPassMark: (newPassMar) => {},
  totalMax: 0,
  setTotalMax: (newTotal) => {},
});
