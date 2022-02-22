import React from 'react';
import { Divider, Segment } from 'semantic-ui-react';
import { Container, IconButton, Modal, Box, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import { Profile } from '../../api/profile/ProfileCollection';
// import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
// import NameModal from '../components/NameModal';

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

/** Renders a segment for the personal information settings See pages/EditProfile.jsx. */
class PersonalInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      open2: false,
    };
  }

  render() {
    const handleOpen = () => {
      this.setState({ open: true });
    };

    const handleClose = () => {
      this.setState({ open: false });
    };

    const handleOpen2 = () => {
      this.setState({ open2: true });
    };

    const handleClose2 = () => {
      this.setState({ open2: false });
    };

    return (
      <div>
        <Container fluid='true' style={{ width: '1000px' }}>
          <Segment className='cardStyle' padded>
            <p id='headers'>Personal Info</p>
            <p className='settingsFont'>Name: (first name prop) (second name prop) <IconButton onClick={handleOpen}><ArrowForwardIosIcon fontSize="small" className='muiButtons' /></IconButton>
              <Modal
                open={this.state.open}
                onClose={handleClose}
              ><Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    Name
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                  </Typography>
                </Box>
              </Modal>
            </p>
            <Divider />
            <p className='settingsFont'>Phone: phone number <IconButton onClick={handleOpen2}><ArrowForwardIosIcon fontSize="small" className='muiButtons' /></IconButton>
              <Modal
                open={this.state.open2}
                onClose={handleClose2}
              ><Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    Phone
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                  </Typography>
                </Box>
              </Modal>
            </p>
            <Divider />
            <p className='settingsFont'>Email: email
            </p>
            <Divider />
          </Segment>
        </Container>
      </div>

    );
  }
}

// Require a document to be passed to this component.
/*
PersonalInfo.propTypes = {
  stuff: PropTypes.shape({
    name: PropTypes.string,
    quantity: PropTypes.number,
    condition: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};
*/
// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(PersonalInfo);
