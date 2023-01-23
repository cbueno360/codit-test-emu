import "./App.css";
import ExamPage from "../features/exams/ExamPage";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import ExamDashboard from "../features/exams/ExamDashboard";
import { ExamContext } from "../context";
import { useState } from "react";

function App() {
  const [total, setTotal] = useState(0);
  const [totalMax, setTotalMax] = useState(0);
  const [started, setStarted] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [correctAwnsers, setCorrectAwnsers] = useState(0);
  const [incorrectAwnsers, setIncorrectAwnsers] = useState(0);
  const [passMark, setPassMark] = useState(800);
  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar />
      {/* <ModalContainer /> */}

      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ExamContext.Provider
          value={{
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
          }}
        >
          <Routes>
            <Route exact path="/exams" element={<ExamDashboard />} />
            <Route exact path="/exams/:id" element={<ExamPage />} />
            <Route
              exact
              path="/exams/:id/:questionNumberId"
              element={<ExamPage />}
            />
          </Routes>
        </ExamContext.Provider>
      </Container>
    </>
  );
}

export default App;
