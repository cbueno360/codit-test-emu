import { useState, useEffect } from "react";
import { Icon, Menu, Table } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useExamService } from "../../hooks/useExamService";
import { useAuth } from "../../hooks/useAuth";

function ExamList() {
  const { getToken, accessToken } = useAuth();
  const [examService] = useExamService();
  const [exams, setExames] = useState([{ name: "", total: "", id: "" }]);
  useEffect(() => {
    getToken().then(() => {
      examService.getAll().then((response) => {
        setExames(response);
      });
    });
  }, [setExames]);

  return (
    <>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Exam ID</Table.HeaderCell>
            <Table.HeaderCell>Exam Name</Table.HeaderCell>
            <Table.HeaderCell>Questions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {exams.map((exam) => (
            <>
              <Table.Row>
                <Table.Cell>
                  <Link to={`/dashboard/exams/${exam.id}`}>{exam.id}</Link>
                </Table.Cell>
                <Table.Cell>{exam.name}</Table.Cell>
                <Table.Cell>{exam.total}</Table.Cell>
              </Table.Row>
            </>
          ))}
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="3">
              <Menu floated="right" pagination>
                <Menu.Item as="a" icon>
                  <Icon name="chevron left" />
                </Menu.Item>
                <Menu.Item as="a">1</Menu.Item>
                <Menu.Item as="a">2</Menu.Item>
                <Menu.Item as="a">3</Menu.Item>
                <Menu.Item as="a">4</Menu.Item>
                <Menu.Item as="a" icon>
                  <Icon name="chevron right" />
                </Menu.Item>
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </>
  );
}

export default ExamList;
