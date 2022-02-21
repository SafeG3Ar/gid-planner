import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import { Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const handleClick = () => {
  console.log('testing click button');
};

const handleClick1 = () => {
  console.log('testing icon button click');
};

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <Grid id='landing-page' verticalAlign='middle' textAlign='center' container>

        <Grid.Column width={4}>
          <Image size='small' circular src="/images/meteor-logo.png"/>
        </Grid.Column>

        <Grid.Column width={8}>
          <h1>Welcome to this template</h1>
          <p>Now get to work and modify this app!</p>
          <Button onClick={handleClick} variant='contained' style={{ backgroundColor: 'purple' }}>
            Testing Click
          </Button>
          <IconButton onClick={handleClick1}>
            <DeleteIcon/>
          </IconButton>
        </Grid.Column>

      </Grid>
    );
  }
}

export default Landing;
