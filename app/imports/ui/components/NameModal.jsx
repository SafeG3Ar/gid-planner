import React from 'react';
import { Modal, Header, Button } from 'semantic-ui-react';
// import { IconButton } from '@mui/material';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '15px',
};

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class NameModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  render() {
    const handleOpen = () => {
      this.setState({ open: true });
    };

    const handleClose = () => {
      this.setState({ open: false });
    };
    return (
      <Modal
        onClose={handleClose}
        onOpen={handleOpen}
        open={this.state.open}
        trigger={<Button>test</Button>}
      >
        <Modal.Header>Your Name</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Header>Default Profile Image</Header>
            <p>Is it okay to use this photo?</p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={handleClose}>
            Nope
          </Button>
          <Button
            content="Yep, that's me"
            icon='checkmark'
            onClick={handleClose}
            positive
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

// Require a document to be passed to this component.
/*
NameModal.propTypes = {
  stuff: PropTypes.shape({
    name: PropTypes.string,
    quantity: PropTypes.number,
    condition: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};
*/

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(NameModal);
