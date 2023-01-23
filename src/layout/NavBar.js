import React from "react";
import { NavLink } from "react-router-dom";
import { Container, Menu } from "semantic-ui-react";
import ExamCreate from "../features/exams/ExamCreate";

function NavBar() {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} to="/" exact header>
          {/* <img src="/assets/codit-logo.jpg" alt="logo" style={{marginRight: '10px' }} /> */}
          Codit Exam Test
        </Menu.Item>
        <Menu.Item as={NavLink} to="/exams" name="Exams" />
        <Menu.Item>
          <ExamCreate></ExamCreate>
          {/* <Button
            as={NavLink}
            to="/createExam"
            positive
            content="Create Exam"
          /> */}
        </Menu.Item>
      </Container>
    </Menu>
  );
}

export default NavBar;
