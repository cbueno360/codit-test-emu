import QuestionCard from "../features/questions/QuestionCard";
import { Container, Grid, Segment } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ExamSetup from "../features/exams/ExamSetup";
import ExamHeader from "../features/exams/ExamHeader";
import ExamResult from "../features/exams/ExamResult";
import { useExam } from "../hooks/useExam";
import { useQuestionService } from "../hooks/useQuestionService";

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
          id={id}
        />
      </Container>
    );
  const [questionService] = useQuestionService();
  useEffect(() => {
    questionService.getAllByExamId(id).then((response) => {
      console.log(response);
      setQuestions(response.questions);
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
                    totalQuestions={0}
                    // {questions.length ?? 0}
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
