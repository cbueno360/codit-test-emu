import { createContext, useContext, useMemo, useState } from "react";
//import { useNavigate } from "react-router-dom";

const ExamContext = createContext();

export const ExamProvider = ({ children }) => {
  const [total, setTotal] = useState(0);
  const [totalMax, setTotalMax] = useState(0);
  const [started, setStarted] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [correctAwnsers, setCorrectAwnsers] = useState(0);
  const [incorrectAwnsers, setIncorrectAwnsers] = useState(0);
  const [passMark, setPassMark] = useState(800);
  //   const navigate = useNavigate();

  //   const newExam = async () => {
  //     setTotal(0);
  //     setQuestionNumber(0);
  //     setCorrectAwnsers(0);
  //     setIncorrectAwnsers(0);
  //     navigate("/dashboard/exams", { replace: true });
  //   };

  const value = useMemo(
    () => ({
      total,
      setTotal,
      questionNumber,
      setQuestionNumber,
      started,
      setStarted,
      correctAwnsers,
      setCorrectAwnsers,
      incorrectAwnsers,
      setIncorrectAwnsers,
      passMark,
      setPassMark,
      totalMax,
      setTotalMax,
    }),
    [
      total,
      setTotal,
      questionNumber,
      setQuestionNumber,
      started,
      setStarted,
      correctAwnsers,
      setCorrectAwnsers,
      incorrectAwnsers,
      setIncorrectAwnsers,
      passMark,
      setPassMark,
      totalMax,
      setTotalMax,
    ] // eslint-disable-line react-hooks/exhaustive-deps
  ); // eslint-disable-line react-hooks/exhaustive-deps

  return <ExamContext.Provider value={value}>{children}</ExamContext.Provider>;
};

export const useExam = () => {
  return useContext(ExamContext);
};
