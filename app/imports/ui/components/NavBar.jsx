import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Header, Input, Icon, Modal } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';
import AddTask from './AddTask';
import AddListItem from './list-form/AddListItem';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  state = {
    open: false,
  }

  handleClose = () => this.setState({ open: false });

  render() {
    const menuStyle = { marginBottom: '10px' };

    return (
      <Menu id='navbar' style={menuStyle} attached="top" borderless inverted>
        <Menu.Item as={NavLink} activeClassName="" exact to="/">
          <Header inverted as='h1'>GID</Header>
        </Menu.Item>
        {this.props.currentUser ? (
          [<Menu.Item as={NavLink} activeClassName="active" exact to="/user-dashboard" key='user-dashboard'>UserDashboard</Menu.Item>]
        ) : ''}
        {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
          <Menu.Item as={NavLink} activeClassName="active" exact to="/admin" key='admin'>Admin</Menu.Item>
        ) : ''}
        <Menu.Item position="right">
          {this.props.currentUser === '' ? (
            <Dropdown id="login-dropdown" key='dropdown-user' text="Login" pointing="top right" icon={'user'}>
              <Dropdown.Menu>
                <Dropdown.Item id="login-dropdown-sign-in" icon="user" text="Login" as={NavLink} exact to="/login" />
                <Dropdown.Item id="login-dropdown-sign-up" icon="add user" text="Sign Up" as={NavLink} exact to="/signup" />
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            [<Menu.Item key='search'> <Input icon='search' placeholder='Search...' /> </Menu.Item>,
            <div key='user-icon-add'>
              <Dropdown
                pointing='top right'
                icon={{ name: 'add', size: 'large' }}
              >
                <Dropdown.Menu>
                  <Modal
                    onClick={e => e.stopPropagation()}
                    trigger={
                      <Dropdown.Item icon={'calendar check outline'} text='Add Task' />}
                    closeIcon
                  >
                    <Modal.Content>
                      <AddTask />
                    </Modal.Content>
                  </Modal>
                  <Modal
                    // open={this.state.open}
                    onClick={e => e.stopPropagation()}
                    trigger={
                      <Dropdown.Item icon={'tasks'} text='Add List' /> }
                    closeIcon
                  >
                    <Modal.Content>
                      <AddListItem />
                    </Modal.Content>
                  </Modal>
                </Dropdown.Menu>
              </Dropdown>

            </div>,
            <div key='user-icon-refresh'>
              <Icon link size='large' name='refresh' />
            </div>,
            <div key='signoutdiv'>
              <Dropdown id="navbar-current-user" key='signout' text={this.props.currentUser} pointing="top right" icon={'user'}>
                <Dropdown.Menu>
                  <Dropdown.Item id="edit-settings" icon="settings" text="Settings" as={NavLink} exact to="/edit-profile" />
                  <Dropdown.Item id="navbar-sign-out" icon="sign out" text="Sign Out" as={NavLink} exact to="/signout" />
                </Dropdown.Menu>
              </Dropdown>
            </div>]
          )}
        </Menu.Item>
      </Menu >
    );
  }
}

// Declare the types of all properties.
NavBar.propTypes = {
  currentUser: PropTypes.string,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBar);

// Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter
export default withRouter(NavBarContainer);
