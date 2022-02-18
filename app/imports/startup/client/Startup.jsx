import { ThemeProvider } from '@material-ui/styles';
import React from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import App from '../../ui/layouts/App.jsx';
import { theme } from './theme';

/* global document */

// Startup the application by rendering the App layout component.
Meteor.startup(() => {
  render(
    <ThemeProvider theme= {theme} >
      <App />
    </ThemeProvider>,
    document.getElementById('root'),
  );
});
