import { Box, Typography, List, ListItemIcon,ListItemText, Grid, ListItemButton, ListSubheader, Paper} from '@mui/material';
import * as React from 'react';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';


// icons import 
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import Divider from '@mui/material/Divider';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// imagen
import LogoGpi from '../Imagenes/Logo-GPI.png';
import "../Imagenes/Header.css";

import Avatar from '@mui/material/Avatar';
import { lime } from '@mui/material/colors';

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


const SideNavOperador = () => {
  
 // const [open, setOpen] = React.useState(true);
 const user = JSON.parse(localStorage.getItem('user'));


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
          <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '15vh', paddingLeft: 60 }}
      >
        <Grid item xs={12}>
        <Avatar
                anchororigin={{ vertical: 'top'}}
                sx={{ width: 80, height: 80, bgcolor: lime[500]  }}
              ><AccountCircleIcon sx={{ width: 80, height: 80}}/></Avatar>
                <Typography variant="h6">{user.Cargo}</Typography>
                <Typography variant="h6">{user.Nombre}</Typography>
        </Grid>   
        
      </Grid>
    </ListItemButton>
    <Divider />
    <ListItemButton href="/ODashboard" sx={{ py: 2, minHeight: 32, color: 'rgba(255,255,255,.8)' }} >
      <ListItemIcon>
          <LeaderboardIcon />
      </ListItemIcon>
      <ListItemText primary="Indicadores" />
    </ListItemButton>

    <ListItemButton href="/ODashboard2da" sx={{ py: 2, minHeight: 32, color: 'rgba(255,255,255,.8)' }} >
      <ListItemIcon>
          <LeaderboardIcon />
      </ListItemIcon>
      <ListItemText primary="Panel de búsqueda" />
    </ListItemButton>
    <ListItemButton onClick={() => {
          localStorage.removeItem('user');
      }}
     href="/" sx={{ py: 2, minHeight: 32, color: 'rgba(255,255,255,.8)' }} >
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

export default SideNavOperador;