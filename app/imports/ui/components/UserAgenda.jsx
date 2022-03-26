import React from 'react';
import { Button, Checkbox, Header, Icon, List, Segment } from 'semantic-ui-react';

const UserAgenda = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  return (
    <Segment id="user-agenda" raised>
      {/* This is the TOMORROW List */}
      <Button circular icon attached="top" inverted>
        <Icon name='add circle'/> Add Task
      </Button>
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

      {/* This is the TOMORROW List */}
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
    </Segment>
  );
};

export default UserAgenda;
