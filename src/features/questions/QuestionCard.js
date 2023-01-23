import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Radio, Grid, Divider } from "semantic-ui-react";
import QuestionResult from "./QuestionsResult";
import PropTypes from "prop-types";

function QuestionCard({
  question,
  answers,
  correctAnswer,
  justification,
  questionNumber,
  url,
}) {
  var [userAnswer, setuserAnswer] = useState();
  const [userAnswerTemporary, setUserAnswerTemporary] = useState(null);
  // const [renderAnswers, setRenderAnswers] = useState(null);
  const [answered, setAnswered] = useState(false);

  const navigate = useNavigate();

  const handleChange = (event, { value }) => {
    setUserAnswerTemporary(value);
  };

  const nextQuestion = (answer) => {
    let intQuestionNumber = parseInt(questionNumber, 10);
    let result = intQuestionNumber + 1;
    var urlTmp = "/exams/AZ-900-01/" + result;
    setAnswered(false);
    setuserAnswer();
    setUserAnswerTemporary(null);
    navigate(urlTmp);
  };

  const submitAnswer = (answer) => {
    setuserAnswer(answer);
    setAnswered(true);
  };

  const getResult = () =>
    userAnswer ? (
      <>
        <Divider />
        <Grid columns={1} relaxed="very" stackable>
          <Grid.Column>
            <Grid.Row>
              <QuestionResult
                answer={userAnswer}
                correctAnswer={correctAnswer}
                justification={justification}
              />
            </Grid.Row>
          </Grid.Column>
        </Grid>
      </>
    ) : (
      <></>
    );

  return (
    <>
      <Form>
        <p>{question}</p>

        <p>Pick up the correct answer</p>

        <Form.Group grouped>
          <Grid columns={2} relaxed="very" stackable>
            <Grid.Column>
              {answers.map((answer) => (
                <>
                  <Grid.Row>
                    <Radio
                      name="htmlRadios"
                      label={answer.label}
                      control="input"
                      checked={userAnswerTemporary === answer.value}
                      value={answer.value}
                      onChange={handleChange}
                    />
                  </Grid.Row>
                </>
              ))}
            </Grid.Column>
          </Grid>
        </Form.Group>
        <Button
          id="btn_id"
          disabled={answered}
          onClick={() => submitAnswer(userAnswerTemporary)}
        >
          Submit
        </Button>

        <Button
          id="btn_id"
          disabled={!answered}
          onClick={() => nextQuestion(userAnswerTemporary)}
        >
          Next Question
        </Button>
      </Form>
      {getResult()}
    </>
  );
}

// Typechecking props for the MDPagination
QuestionCard.propTypes = {
  question: PropTypes.number,
};

export default QuestionCard;
