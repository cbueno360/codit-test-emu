import { Grid, Segment, Card, Icon, Header } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { useExam } from "../../hooks/useExam";

function QuestionResult({ answer, correctAnswer, justification }) {
  const {
    correctAwnsers,
    setCorrectAwnsers,
    incorrectAwnsers,
    setIncorrectAwnsers,
  } = useExam();

  var [answerResult, setAnswerResult] = useState({
    color: "green",
    icon: "thumbs up",
  });

  useEffect(() => {
    const errorAwnserSetup = { color: "red", icon: "thumbs down" };
    const correctAwnserSetup = { color: "green", icon: "thumbs up" };
    if (answer.toLowerCase() === correctAnswer.toLowerCase()) {
      setCorrectAwnsers(+correctAwnsers + 1);
      setAnswerResult(correctAwnserSetup);
    } else {
      setIncorrectAwnsers(+incorrectAwnsers + 1);
      setAnswerResult(errorAwnserSetup);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Card>
        <Card.Content>
          <Header as="h4" color={answerResult.color}>
            Result
          </Header>
        </Card.Content>
        <Card.Content>
          <Grid columns={1}>
            <Grid.Row stretched>
              <Grid.Column>
                <Segment color={answerResult.color}>
                  You answer: <b>{answer}</b>{" "}
                  <Icon name={answerResult.icon} color={answerResult.color} />
                </Segment>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row stretched>
              <Grid.Column>
                <Segment color={answerResult.color}>
                  The correct is: <b>{correctAnswer}</b>
                </Segment>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row stretched>
              <Grid.Column>
                <Segment color={answerResult.color}>
                  The justification is <b>{justification}</b>{" "}
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Card.Content>
        <Card.Content extra>
          <Icon name={answerResult.icon} color={answerResult.color} />
        </Card.Content>
      </Card>
    </>
  );
}

export default QuestionResult;
