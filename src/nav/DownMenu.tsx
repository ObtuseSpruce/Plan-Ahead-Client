import React from 'react';
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

interface PropsInt {
  updateToken: (newToken: string)=>void 
}

const DownMenu: React.FC<PropsInt> = props => {
  //logout event handler
  const handleLogout = (event: React.FormEvent) => {
    event.preventDefault()
    props.updateToken('')
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (e: any) => {
      console.log(e.currentTarget)
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

const handleLogoutMenu = (e: React.FormEvent) => {
    handleClose()
    handleLogout(e)
  }




  return (
    <span>
      <div className="buttonNav">
        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} variant="contained">
          Menu
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
          <Link to="/">
              Home
          </Link>
          </MenuItem>
          <MenuItem onClick={handleLogoutMenu}>
            <Link to='/'>
              Logout
            </Link>
          </MenuItem>
        </Menu>
      </div>
    </span>
  );
}

export default DownMenu
