import React from 'react';
import { Menu, Sidebar } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
// import AddTask from './AddTask';
import { Tasks } from '../../api/task/TaskCollection';
// import TaskListItem from './TaskListItem';

const UserSideBar = () => (
  <div className='user-side-bar' >
    <Sidebar
      as={Menu}
      animation='push'
      direction='left'
      icon='labeled'
      inverted
      visible
      vertical
      width='thin'
    >
      <Menu.Item>
        <Menu.Header>Products</Menu.Header>

        <Menu.Menu>
          <Menu.Item
            name='enterprise'
            //  active={activeItem === 'enterprise'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='consumer'
            // active={activeItem === 'consumer'}
            onClick={this.handleItemClick}
          />
        </Menu.Menu>
      </Menu.Item>

      <Menu.Item>
        <Menu.Header>CMS Solutions</Menu.Header>

        <Menu.Menu>
          <Menu.Item
            name='rails'
            // active={activeItem === 'rails'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='python'
            //  active={activeItem === 'python'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='php'
            //  active={activeItem === 'php'}
            onClick={this.handleItemClick}
          />
        </Menu.Menu>
      </Menu.Item>

      <Menu.Item>
        <Menu.Header>Hosting</Menu.Header>

        <Menu.Menu>
          <Menu.Item
            name='shared'
            //  active={activeItem === 'shared'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='dedicated'
            //  active={activeItem === 'dedicated'}
            onClick={this.handleItemClick}
          />
        </Menu.Menu>
      </Menu.Item>

      <Menu.Item>
        <Menu.Header>Support</Menu.Header>

        <Menu.Menu>
          <Menu.Item
            name='email'
            //  active={activeItem === 'email'}
            onClick={this.handleItemClick}
          >
              E-mail Support
          </Menu.Item>

          <Menu.Item
            name='faq'
            //  active={activeItem === 'faq'}
            onClick={this.handleItemClick}
          >
              FAQs
          </Menu.Item>
        </Menu.Menu>
      </Menu.Item>
    </Sidebar>
  </div>

);

// Require a document to be passed to this component.
UserSideBar.propTypes = {
  tasks: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Tasks.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the document
  const tasks = Tasks.collection.find({}).fetch();
  return {
    tasks,
    ready,
  };
})(UserSideBar);
