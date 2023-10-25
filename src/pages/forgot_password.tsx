import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button } from '@mui/material';
import { getAuth } from 'firebase/auth';
import app from '../../firebase/config';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth'

function ForgotPassword() {
  const [email, setEmail] = useState('');

  const auth = getAuth(app)
  const [sendEmailRemember, loadingSEM, errorSEM] = useSendPasswordResetEmail(auth)

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    await sendEmailRemember(email)
    console.log('Se envió una solicitud de restablecimiento de contraseña para:', email);
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '50px' }}>
        <Typography variant="h5" gutterBottom>
          Olvidé mi Contraseña
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Correo Electrónico"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: '20px' }}
          >
            Enviar solicitud de restablecimiento
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default ForgotPassword;
