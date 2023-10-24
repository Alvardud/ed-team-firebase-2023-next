import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button } from '@mui/material';

function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e:any) => {
    e.preventDefault();
    // Aquí puedes manejar el envío de datos, como enviar un correo de restablecimiento de contraseña.
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
