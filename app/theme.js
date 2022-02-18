/** creating a theme for the entire app that is imported on startup.js to use
    we can use wrap this around to set the theme */
import { createTheme } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

export const theme = createTheme({
  palette: {
    primary: {
      main: grey[500],
    },
  },
});
