import QuestionCard from "../features/questions/QuestionCard";
import { Container, Grid, Segment } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ExamSetup from "../features/exams/ExamSetup";
import ExamHeader from "../features/exams/ExamHeader";
import ExamResult from "../features/exams/ExamResult";
import axios from "axios";
import { useExam } from "../hooks/useExam";

export const ExamPage = () => {
  let { id, questionNumberId } = useParams();

  const { setQuestionNumber, total, started, setStarted } = useExam();

  const [questions, setQuestions] = useState([
    {
      question: "",
      answers: [
        { label: "", value: "" },
        { correctAnswer: "" },
        { justification: "" },
      ],
    },
  ]);

  const isFinished = () =>
    questionNumberId ? isAlreadyFinished(questionNumberId, total) : false;

  const isAlreadyFinished = (actualQuestion, totalQuestions) => {
    let actualQuestionInt = parseInt(actualQuestion, 10);
    let totalQuestionsInt = parseInt(totalQuestions, 10);
    return actualQuestionInt > totalQuestionsInt;
  };

  const examPageBody = () =>
    !questionNumberId ? (
      <>
        <ExamSetup totalMax={questions.length} />
      </>
    ) : (
      <Container fluid>
        <QuestionCard
          question={questions[questionNumberId - 1].question}
          answers={questions[questionNumberId - 1].answers}
          correctAnswer={questions[questionNumberId - 1].correctAnswer}
          justification={questions[questionNumberId - 1].justification}
          questionNumber={questionNumberId}
        />
      </Container>
    );

  useEffect(() => {
    let urlExam = "/api/data/exam-" + id + ".json";
    axios.get(urlExam).then((response) => {
      setQuestions(response.data);
      setStarted(true);
    });
  }, [setStarted, setQuestions, id]);

  useEffect(() => {
    if (questionNumberId) setQuestionNumber(questionNumberId);
  }, [questionNumberId, setQuestionNumber]);

  useEffect(() => {
    if (started) setStarted(started);
  }, [started, setStarted]);

  return (
    <>
      {isFinished() ? (
        <>
          <ExamResult />
        </>
      ) : (
        <div>
          <Grid columns={1}>
            <Grid.Row stretched>
              <Grid.Column>
                <Segment>
                  <ExamHeader
                    examId={id}
                    totalQuestions={questions.length ?? 0}
                  />
                </Segment>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row stretched>
              <Grid.Column>
                <Segment>{examPageBody()}</Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      )}
    </>
  );
};
