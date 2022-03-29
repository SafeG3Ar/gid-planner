import React from 'react';
import { Grid, Segment, Image } from 'semantic-ui-react';

const logo = '../landing/images/gidcheck-transparent.png';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <Segment>
        <Grid columns={3} relaxed='very'>
          <Grid.Column>
            <Image source={logo} size='small' />
          </Grid.Column>
          <Grid.Column>
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}

export default Landing;
