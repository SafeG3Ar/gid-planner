import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import 'semantic-ui-css/semantic.css';
import { Roles } from 'meteor/alanning:roles';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Landing from '../pages/Landing';
import ListStuff from '../pages/ListStuff';
// import ListStuffAdmin from '../pages/ListStuffAdmin';
import AddStuff from '../pages/AddStuff';
import AddTaskPage from '../pages/AddTaskPage';
import EditStuff from '../pages/EditStuff';
import NotFound from '../pages/NotFound';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Signout from '../pages/Signout';
import EditProfile from '../pages/EditProfile';
import EditName from '../components/EditName';
import EditPhone from '../components/EditPhone';
// import VerifyCopy from '../components/VerifyCopy';
import UserDashboard from '../pages/UserDashboard';
import UserCalendar from '../components/UserCalendar';
import UserAgenda from '../components/UserAgenda';
import ListUserAdmin from '../pages/ListUserAdmin';
// import UserTimeout from '../components/UserTimeout';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar/>
          <Switch>
            <Route exact path="/" component={Landing}/>
            <Route path="/login" component={Login}/>
            <Route path="/signup" component={Signup}/>
            <Route path="/add" component={AddStuff}/>
            <ProtectedRoute path="/signout" component={Signout}/>
            <ProtectedRoute path="/list" component={ListStuff}/>
            <ProtectedRoute path="/addtask" component={AddTaskPage}/>
            <ProtectedRoute path="/edit/:_id" component={EditStuff}/>
            <ProtectedRoute path="/edit-profile" component={EditProfile}/>
            <ProtectedRoute path="/edit-name/:_id" component={EditName}/>
            <ProtectedRoute path="/edit-phone/:_id" component={EditPhone}/>
            <ProtectedRoute path="/user-dashboard" component={UserDashboard}/>
            <ProtectedRoute path="/user-agenda" component={UserAgenda}/>
            <ProtectedRoute path="/user-calendar" component={UserCalendar}/>
            {/* <ProtectedRoute path="/user-timeout" component={UserTimeout}/> */}
            <AdminProtectedRoute path="/admin" component={ListUserAdmin}/>
            <Route component={NotFound}/>
          </Switch>
          <Footer/>
        </div>
      </Router>
    );
  }
}

/**
 * ProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      return isLogged ?
        (<Component {...props} />) :
        (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
        );
    }}
  />
);

/**
 * AdminProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
      return (isLogged && isAdmin) ?
        (<Component {...props} />) :
        (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
        );
    }}
  />
);

// Require a component and location to be passed to each ProtectedRoute.
ProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

// Require a component and location to be passed to each AdminProtectedRoute.
AdminProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

export default App;
