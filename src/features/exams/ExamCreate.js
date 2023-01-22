import React from "react";
import { Button, Header, Image, Modal } from "semantic-ui-react";

function ExamCreate() {
  const [open, setOpen] = React.useState(false);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button positive>Create Exam</Button>}
    >
      <Modal.Header>Create Exam</Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          <Header>Information</Header>
          <p>This feature is in developement.</p>
          <p>Please, check it out again later on.</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          content="Close"
          icon="checkmark"
          onClick={() => setOpen(false)}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
}

export default ExamCreate;
