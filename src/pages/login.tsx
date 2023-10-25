import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Grid, Box } from '@mui/material';
import { useRouter } from 'next/navigation'
import app from '../../firebase/config';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

function LoginPage() {
  const auth = getAuth(app)
  const router = useRouter()

  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  const handleCorreoChange = (e: any) => {
    setCorreo(e.target.value);
  };

  const handleContrasenaChange = (e: any) => {
    setContrasena(e.target.value);
  };

  const iniciarSesion = async () => {
    try {
      await signInWithEmailAndPassword(auth, correo, contrasena);
      router.push('/chats_list')
    } catch (e) {
      console.error("El inicio de sesion es incorrecto")
    }
  }
  return (
    <Container maxWidth="xs">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '50px' }}>
        <Typography variant="h5" gutterBottom>
          Iniciar Sesión
        </Typography>
        <form noValidate autoComplete="off">
          <TextField
            fullWidth
            label="Correo Electrónico"
            variant="outlined"
            margin="normal"
            onChange={handleCorreoChange}
          />
          <TextField
            fullWidth
            label="Contraseña"
            variant="outlined"
            margin="normal"
            type="password"
            onChange={handleContrasenaChange}
          />
          <Grid container direction="row" spacing={1}>
            <Grid item xs={6}><Button
              variant="outlined"
              color="primary"
              fullWidth
              onClick={() => {
                router.push('/register')
              }}
              style={{ marginTop: '20px' }}
            >
              Registrarme
            </Button></Grid>
            <Grid item xs={6}><Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={iniciarSesion}
              style={{ marginTop: '20px' }}
            >
              Ingresar
            </Button></Grid>
          </Grid>
          <Box height={10} />
          <Button
            variant="text"
            color="primary"
            fullWidth
            onClick={()=>{
              router.push('/forgot_password')
            }}
            style={{ marginTop: '20px' }}
          >
            Olvide mi Contraseña
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default LoginPage;
