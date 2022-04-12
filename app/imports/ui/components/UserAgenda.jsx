import React, { useState } from 'react';
import { Button, Checkbox, Header, Icon, List, Segment, Modal } from 'semantic-ui-react';
import AddTask from './AddTask';

const UserAgenda = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [modalOpen, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  return (
    <Segment id="user-agenda" raised>
      {/* This is the TOMORROW List */}
      <Modal
        closeIcon
        size={small}
        open={modalOpen}
        onClose={handleClose}
        onOpen={handleOpen}
        trigger={
          <Button circular icon attached="top" inverted onClick={handleOpen}>
            <Icon name='add circle' /> Add Task
          </Button>
        }
      >
        <Modal.Content>
          <AddTask />
        </Modal.Content>
      </Modal>
      <Header as='h2' attached='top'>
        Today
        <Header.Subheader>{today.toDateString()}</Header.Subheader>
      </Header>
      <List celled verticalAlign='middle'>
        <List.Item>
          <Checkbox label={{ children: 'List1' }} />
        </List.Item>
        <List.Item>
          <Checkbox label={{ children: 'List1' }} />
        </List.Item>
        <List.Item>
          <Checkbox label={{ children: 'List1' }} />
        </List.Item>
        <List.Item>
          <Checkbox label={{ children: 'List1' }} />
        </List.Item>
        <List.Item>
          <Checkbox label={{ children: 'List1' }} />
        </List.Item>
        <List.Item>
          <Checkbox label={{ children: 'List1' }} />
        </List.Item>
      </List>

      {/* This is the TOMORROW List */ }
      <Header className='agenda-title' as='h2' attached='top'>
        Tomorrow
        <Header.Subheader>{tomorrow.toDateString()}</Header.Subheader>
      </Header>
      <List divided verticalAlign='middle'>
        <List.Item>
          <Checkbox label={{ children: 'List1' }} />
        </List.Item>
        <List.Item>
          <Checkbox label={{ children: 'List1' }} />
        </List.Item>
        <List.Item>
          <Checkbox label={{ children: 'List1' }} />
        </List.Item>
        <List.Item>
          <Checkbox label={{ children: 'List1' }} />
        </List.Item>
        <List.Item>
          <Checkbox label={{ children: 'List1' }} />
        </List.Item>
        <List.Item>
          <Checkbox label={{ children: 'List1' }} />
        </List.Item>
      </List>
    </Segment >
  );
};

export default UserAgenda;
