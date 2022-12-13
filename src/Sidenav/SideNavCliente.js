import { Box, Typography, List, ListItemIcon,ListItemText, Grid, ListItemButton, ListSubheader, Paper} from '@mui/material';
import * as React from 'react';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';


// icons import 
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import Divider from '@mui/material/Divider';

// imagen
import Image from 'mui-image'
// import LogoGpi2 from '../Imagenes/Logo-GPI2.png';
import LogoGpi from '../Imagenes/Logo-GPI.png';
import LogoLipigas from '../Imagenes/Logo-Lipigas.png';

import { Link } from "react-router-dom";
import ListItem from "@mui/material/ListItem";

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


const SideNavCliente = () => {
  
 // const [open, setOpen] = React.useState(true);
 const user = JSON.parse(localStorage.getItem('user'));

 function ListItemLink(props) {
  const { icon, primary, to } = props;
  return (
    <li>
      <ListItem button component={Link} to={to} sx={{ py: 3}} >
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
  }


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
              <Image duration={1000} height="80%" width="100%" src={LogoGpi}/>
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
        style={{ minHeight: '15vh'}}>
        <Grid item xs={12} style={{ minHeight: '15vh' }}>
          <Typography align="center" variant="h5">Lipigas </Typography>
          <Typography align="center" variant="h5">Concon </Typography>
          <p/>
          <Divider/><Divider/>
          <p/>
          <Image duration={1000} height="100%" width="100%" src={LogoLipigas}/>
          <p/>
          <Divider/><Divider/>
          <p/>
          <Typography align="center" variant="h5">{user.Rut}</Typography>
          <Typography align="center" variant="h5">{user.Nombre}</Typography>
          <Typography align="center" variant="h5">{user.Cargo}</Typography>
        </Grid>
      </Grid>
    </ListItemButton>

    <Divider />

    <ListItemLink 
      to="/CDashboard2da" 
      primary="Panel de búsqueda" 
      icon={<LeaderboardIcon />}/>

    <ListItemLink
      onClick={() => {
      localStorage.removeItem('user');
      }}
      to="/" 
      primary="Cerrar Sesión" 
      icon={<PersonOffIcon />}/>
      
    </List>
    <Typography variant="h5" color="black" style={{paddingLeft: 110 }}> GPI Lab © </Typography>
    <List sx={{ py: 30, minHeight: 32, color: 'rgba(255,255,255,.8)' }} >
    </List>
          </FireNav>
        </Paper>
      </ThemeProvider>
    </Box>
    </>
  );
}

export default SideNavCliente;