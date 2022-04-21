import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
class UserListAdmin extends React.Component {
  render() {
    return (
      <Table.Row>
        <Table.Cell>{this.props.user.firstName}</Table.Cell>
        <Table.Cell>{this.props.user.lastName}</Table.Cell>
        <Table.Cell>{this.props.user.email}</Table.Cell>
        <Table.Cell>{this.props.user.owner}</Table.Cell>
        <Table.Cell>{this.props.user.phone}</Table.Cell>
      </Table.Row>
    );
  }
}

// Require a document to be passed to this component.
UserListAdmin.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    phone: PropTypes.string,
    owner: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default UserListAdmin;
