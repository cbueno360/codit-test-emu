import { Button, Input, Message, Form, Header, Label } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { ExamContext } from "../../context";
import { useContext, useEffect } from "react";
function ExamSetup({ totalMax }) {
  const navigate = useNavigate();
  const {
    total,
    passMark,
    setTotal,
    setStarted,
    setCorrectAwnsers,
    setIncorrectAwnsers,
    setQuestionNumber,
    setPassMark,
  } = useContext(ExamContext);

  const startExam = () => {
    setStarted(true);
    navigate("1");
  };
  // Go to the first question
  useEffect(() => {
    setTotal(0);
    setQuestionNumber(0);
    setCorrectAwnsers(0);
    setIncorrectAwnsers(0);
    setStarted(false);
  }, []);

  const handleTotalChange = (event) => {
    setTotal(event.target.value);
  };

  const handlePassMarkChange = (event) => {
    setPassMark(event.target.value);
  };

  return (
    <div>
      <Form error={true}>
        <Header as="h3">Setup your exam</Header>
        <Form.Field inline required>
          <Input
            type="text"
            name="total"
            value={total}
            label="Number of questions"
            onChange={handleTotalChange}
          />
        </Form.Field>
        {total > totalMax ? (
          <Message
            error
            header="Action Forbidden"
            content="Number of questions cannot be greater than total of questions."
          />
        ) : (
          ""
        )}

        <Form.Field inline>
          <Input
            type="text"
            name="total"
            label="Pass mark"
            value={passMark}
            onChange={handlePassMarkChange}
          />
        </Form.Field>
        {passMark > 1000 ? (
          <Message
            error
            header="Action Forbidden"
            content="Pass mark cannot be greater than 1000."
          />
        ) : (
          ""
        )}
        <Button
          id="btn_id"
          disabled={total < 1 || total > totalMax || passMark > 1000}
          onClick={() => startExam()}
        >
          Start Exam
        </Button>
      </Form>
    </div>
  );
}

export default ExamSetup;
