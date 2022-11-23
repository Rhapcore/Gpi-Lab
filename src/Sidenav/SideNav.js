import { List, ListItemIcon,ListItemText  , ListItemButton, ListSubheader, Paper, Menu} from '@mui/material';
import * as React from 'react';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import { Box } from '@mui/system';



// icons import 
import GroupIcon from '@mui/icons-material/Group';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import Divider from '@mui/material/Divider';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// imagen
import LogoGpi from '../Imagenes/Logo-GPI.png';
import "../Imagenes/Header.css";

import Avatar from '@mui/material/Avatar';
import { deepOrange, lime } from '@mui/material/colors';
import Stack from '@mui/material/Stack';

const FireNav = styled(List)({
  "& .MuiListItemButton-root": {
    paddingLeft: 30,
    paddingRight: 50
  },
  "& .MuiListItemIcon-root": {
    minWidth: 0,
    marginRight: 16
  },
  "& .MuiSvgIcon-root": {
    fontSize: 20
  }
});


const SideNav = () => {
  
 // const [open, setOpen] = React.useState(true);


  return (
    <>
    <Box sx={{ display: 'flex' }}>
    <ThemeProvider
        theme={createTheme({
          components: {
            MuiListItemButton: {
              defaultProps: {
                disableTouchRipple: true,
              },
            },
          },
          palette: {
            mode: 'dark',
            primary: { main: '#757575' },
            background: { paper: '#757575' },
          },
        })}
      >
        <Paper elevation={0} sx={{ maxWidth: 256 }}>
          <FireNav component="nav" disablePadding>
            <ListItemButton component="a" >
              <img src={ LogoGpi } className="imagenLogo"/>
              <ListItemIcon 
              sx={{ fontSize: 20 }}></ListItemIcon>
              <ListItemText
                sx={{ my: 5 }}
                primary=""
                primaryTypographyProps={{
                  fontSize: 30,
                  fontWeight: "medium",
                  letterSpacing: 0
                }}
              />
            </ListItemButton>
            <Divider />
    <List
    sx={{ width: '100%', maxWidth: 250, bgcolor: 'background.paper' }}
    component="nav"
    aria-labelledby="nested-list-subheader"
    subheader={
      <ListSubheader component="div" id="nested-list-subheader">
      </ListSubheader>
    }
  >
    
    <ListItemButton>
      <Stack direction="row" spacing={2}>
      <i>ㅤㅤㅤㅤㅤ</i>
              <Avatar
                anchorOrigin={{ vertical: 'top',horizontal: 'center'}}
                AccountCircleIcon
                sx={{ width: 80, height: 80, bgcolor: lime[500]  }}
              ><AccountCircleIcon sx={{ width: 80, height: 80}}/></Avatar>
              <i>ㅤ</i>
              </Stack>
              </ListItemButton>
              <tr>ㅤㅤㅤㅤㅤUsuario Admin ㅤㅤㅤㅤ</tr>
              <tr>ㅤㅤㅤNombre Maria de la luzㅤㅤㅤ</tr>
    <Divider />
    <ListItemButton href="/Dashboard" sx={{ py: 2, minHeight: 32, color: 'rgba(255,255,255,.8)' }} >
      <ListItemIcon>
          <LeaderboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>

    <ListItemButton href="/Dashboard2da" sx={{ py: 2, minHeight: 32, color: 'rgba(255,255,255,.8)' }} >
      <ListItemIcon>
          <LeaderboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard2da" />
    </ListItemButton>

    <ListItemButton href="/Usuarios" sx={{ py: 2, minHeight: 32, color: 'rgba(255,255,255,.8)' }} >
      <ListItemIcon>
          <GroupIcon />
      </ListItemIcon>
      <ListItemText primary="Cuentas Usuarios" />
    </ListItemButton>

    <ListItemButton href="/Opciones" sx={{ py: 2, minHeight: 32, color: 'rgba(255,255,255,.8)' }} >
      <ListItemIcon>
          <SettingsIcon />
      </ListItemIcon>
      <ListItemText primary="Opciones" />
    </ListItemButton>

    <ListItemButton href="/" sx={{ py: 2, minHeight: 32, color: 'rgba(255,255,255,.8)' }} >
      <ListItemIcon>
          <PersonOffIcon />
      </ListItemIcon>
      <ListItemText primary="Cerrar Session"/>
    </ListItemButton>
    </List>
    <List sx={{ py: 30, minHeight: 32, color: 'rgba(255,255,255,.8)' }} >
    </List>
          </FireNav>
        </Paper>
      </ThemeProvider>
    </Box>
    </>
  );
}

export default SideNav;