import React from 'react';
import { Button, Header, Icon, Segment } from 'semantic-ui-react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const UserAgenda = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  return (
    <Segment id="user-agenda" raised>
      <Button circular icon attached="top">
        <Icon name='add circle'/>
      </Button>
      <Header as='h2' attached='top'>
      Today
        <Header.Subheader>{today.toDateString()}</Header.Subheader>
      </Header>
      <List
        sx={{
          width: '100%',
          maxWidth: 800,
          bgcolor: 'background.paper',
          position: 'relative',
          overflow: 'auto',
          maxHeight: 265,
          '& ul': { padding: 0 },
        }}
        subheader={<li />}
      >
        {[0, 1, 2, 3, 4].map((sectionId) => (
          <li key={`section-${sectionId}`}>
            <ul>
              {[0, 1, 2].map((item) => (
                <ListItem key={`item-${sectionId}-${item}`}>
                  <ListItemText primary={`Item ${item}`} />
                </ListItem>
              ))}
            </ul>
          </li>
        ))}
      </List>

      {/* This is the TOMORROW List */}
      <Header className='agenda-title' as='h2' attached='top'>
      Tomorrow
        <Header.Subheader>{tomorrow.toDateString()}</Header.Subheader>
      </Header>
      <List
        sx={{
          width: '100%',
          maxWidth: 800,
          bgcolor: 'background.paper',
          position: 'relative',
          overflow: 'auto',
          maxHeight: 265,
          '& ul': { padding: 0 },
        }}
        subheader={<li />}
      >
        {[0, 1, 2, 3, 4].map((sectionId) => (
          <li key={`section-${sectionId}`}>
            <ul>
              {[0, 1, 2].map((item) => (
                <ListItem key={`item-${sectionId}-${item}`}>
                  <ListItemText primary={`Item ${item}`} />
                </ListItem>
              ))}
            </ul>
          </li>
        ))}
      </List>
    </Segment>
  );
};

export default UserAgenda;
