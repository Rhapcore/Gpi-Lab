import { Box, Typography, List, ListItemIcon,ListItemText, Grid, ListItemButton, ListSubheader, Paper, Menu} from '@mui/material';
import * as React from 'react';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';


// icons import 
import GroupIcon from '@mui/icons-material/Group';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import Divider from '@mui/material/Divider';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// imagen
import LogoGpi2 from '../Imagenes/Logo-GPI2.png';
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
        spacing={-1}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '15vh', paddingLeft: 10 }}
      >
        <Grid item xs={12}>
        <Typography style={{paddingLeft: 10 }}>Nombre Empresa</Typography>
        <Typography style={{paddingLeft: 10 }}>Nombre Ubicacion</Typography>
              <AccountCircleIcon 
              sx={{ width: 80, height: 80}}
              style={{paddingLeft: 30 }}
              />
                <Typography  style={{paddingLeft: 20 }}>{user.Cargo}</Typography>
                <Typography  style={{paddingLeft: 20 }}>{user.Rut}</Typography>
                <Typography  style={{paddingLeft: 20 }}>{user.Nombre}</Typography>
        </Grid>   
        
      </Grid>
    </ListItemButton>
    <Divider />
    <ListItemButton href="/ADashboard2da" sx={{ py: 2, minHeight: 32, color: 'rgba(255,255,255,.8)' }} >
      <ListItemIcon>
          <LeaderboardIcon />
      </ListItemIcon>
      <ListItemText primary="Panel de búsqueda" />
    </ListItemButton>

    <ListItemButton href="/AAcuerdoComercial" sx={{ py: 2, minHeight: 32, color: 'rgba(255,255,255,.8)' }} >
      <ListItemIcon>
          <LeaderboardIcon />
      </ListItemIcon>
      <ListItemText primary="Acuerdo Comercial" />
    </ListItemButton>

    <ListItemButton href="/ADashboard" sx={{ py: 2, minHeight: 32, color: 'rgba(255,255,255,.8)' }} >
      <ListItemIcon>
          <LeaderboardIcon />
      </ListItemIcon>
      <ListItemText primary="Indicadores" />
    </ListItemButton>

    <ListItemButton href="/AUsuarios" sx={{ py: 2, minHeight: 32, color: 'rgba(255,255,255,.8)' }} >
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
    <img style={{paddingLeft: 90 }} src={ LogoGpi2 } className="imagenLogoGrande"/>
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