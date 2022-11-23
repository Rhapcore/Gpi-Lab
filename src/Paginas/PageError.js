// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box } from '@mui/material';

// imagen
import Error404 from '../Imagenes/Error-404.jpg';

// ----------------------------------------------------------------------

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 500,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(0, 0),
}));

// ----------------------------------------------------------------------

export default function Page404() {
  return (
    <>

      <Container>
        <StyledContent sx={{ textAlign: 'center', alignItems: 'center' }}>
          <Typography variant="h3" paragraph>
            Lo sentimos, página no encontrada!
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            Lo sentimos, no pudimos encontrar la página que estás buscando. ¿Quizás has escrito mal la URL? Asegúrese de revisar su
            ortografía.
          </Typography>

          <Box
            component="img"
            src={ Error404 }
            sx={{ height: 300, mx: 'auto', my: { xs: 5, sm: 2 } }}
          />

          <Button href="/" size="large" variant="contained">
            Go to Home
          </Button>
          </StyledContent>
      </Container>
    </>
  );
}
