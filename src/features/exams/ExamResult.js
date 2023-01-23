import { Button, Header, Card, Icon, Statistic } from "semantic-ui-react";
import Chart from "react-apexcharts";
import { ExamContext } from "../../context";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ExamResult({ examId }) {
  const navigate = useNavigate();
  const { correctAwnsers, incorrectAwnsers, total, passMark } =
    useContext(ExamContext);

  var [examOutcome, setExamOutcome] = useState({
    color: "green",
    icon: "thumbs up",
    success: true,
    message: "You've passed, congratulations!",
  });
  const [score, setScore] = useState(0);
  const [state, setState] = useState({
    series: [0, 0],
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      labels: ["Correct", "Incorrect"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });

  useEffect(() => {
    const resultFail = {
      color: "red",
      icon: "thumbs down",
      success: false,
      message: "Sorry! You've failed. Try it again!",
    };
    const resultSuccess = {
      color: "green",
      icon: "thumbs up",
      success: true,
      message: "You've passed, congratulations!",
    };

    let calculdatedScore = (1000 / total) * correctAwnsers;
    setScore(calculdatedScore);

    if (score >= passMark) {
      setExamOutcome(resultSuccess);
    } else {
      setExamOutcome(resultFail);
    }

    setState({
      series: [correctAwnsers, incorrectAwnsers],
      options: {
        chart: {
          width: 380,
          type: "pie",
        },
        labels: ["Correct", "Incorrect"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    });
  }, [correctAwnsers, incorrectAwnsers, passMark, score, total]);

  return (
    <>
      <Card fluid>
        <Card.Content>
          <Header as="h4" color={examOutcome.color}>
            <Icon name={examOutcome.icon} color={examOutcome.color} />
            {examOutcome.message}
          </Header>
        </Card.Content>
        <Card.Content>
          <div>
            <Header as="h2">
              Exam: {examId} | Total Questions - {total}
            </Header>
            <Statistic.Group>
              <Statistic>
                <Statistic.Value>{score}</Statistic.Value>
                <Statistic.Label>Your Score</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>{passMark}</Statistic.Value>
                <Statistic.Label>Minimum Score</Statistic.Label>
              </Statistic>
            </Statistic.Group>
          </div>
          <div id="chart">
            <Chart
              options={state.options}
              series={state.series}
              type="pie"
              width={280}
            />
          </div>
        </Card.Content>
        <Card.Content extra>
          <Button
            id="btn_id"
            basic
            color="blue"
            onClick={() => navigate("/exams")}
          >
            Replay
          </Button>
          <Button
            id="btn_id"
            basic
            color="green"
            onClick={() => navigate("/exams")}
          >
            Start new Exam
          </Button>
        </Card.Content>
      </Card>
    </>
  );
}

export default ExamResult;
