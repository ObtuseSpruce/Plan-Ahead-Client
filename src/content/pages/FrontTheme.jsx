import { createMuiTheme } from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange';
import blue from '@material-ui/core/colors/blue';

const FrontTheme = createMuiTheme({
    palette: {
        primary: {
            main: "#f57c00"
        },
        secondary: blue,
      },
      status: {
        danger: 'orange',
      },
});

export default FrontTheme