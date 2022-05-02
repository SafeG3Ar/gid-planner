import React from 'react';
import { List, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Item extends React.Component {
  render() {
    return (
      <List horizontal>
        <List.Item>
          <List.Content>
            <Label size='mini'>
              {this.props.item.item} 
            </Label>
          </List.Content>
        </List.Item>
      </List>
    );
  }
}

/** Require a document to be passed to this component. */
Item.propTypes = {
  item: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Item);
