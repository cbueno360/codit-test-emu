import { Header, Statistic, Progress } from "semantic-ui-react";
import { useState, useEffect } from "react";
import { useExam } from "../../hooks/useExam";

function ExamHeader({ examId, examName, totalQuestions }) {
  const [examPercent, setExamPercent] = useState(0);

  const { total, questionNumber } = useExam();

  useEffect(() => {
    let actualQuestion = parseInt(questionNumber, 10);
    let totalQuestions = parseInt(total);
    setExamPercent((100 / totalQuestions) * (actualQuestion - 1));
  }, [examPercent, setExamPercent, questionNumber, total]);

  return (
    <div>
      <Header as="h2">
        Exam: {examId} | Total Questions - {totalQuestions}
      </Header>
      <Statistic.Group>
        <Statistic>
          <Statistic.Value>{questionNumber}</Statistic.Value>
          <Statistic.Label>Question</Statistic.Label>
        </Statistic>
        <Header as="h2">of</Header>
        <Statistic>
          <Statistic.Value>{total}</Statistic.Value>
          <Statistic.Label>Questions</Statistic.Label>
        </Statistic>
      </Statistic.Group>
      <Progress percent={examPercent} color="teal" />
    </div>
  );
}

export default ExamHeader;
