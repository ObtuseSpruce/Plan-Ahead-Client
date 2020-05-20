import { createMuiTheme } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import orange from '@material-ui/core/colors/orange';


const ThemeSet = createMuiTheme({
    palette: {
      primary: teal,
      secondary: orange,
    },
    status: {
      danger: 'orange',
    },
  });

export default ThemeSet