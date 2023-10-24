import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button } from '@mui/material';

function UserRegistration() {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    profession: '',
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    
    console.log(userData);
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '50px' }}>
        <Typography variant="h5" gutterBottom>
          Registro de Usuario
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Nombres"
            variant="outlined"
            margin="normal"
            name="firstName"
            value={userData.firstName}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Apellidos"
            variant="outlined"
            margin="normal"
            name="lastName"
            value={userData.lastName}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Edad"
            variant="outlined"
            margin="normal"
            name="age"
            value={userData.age}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Profesión"
            variant="outlined"
            margin="normal"
            name="profession"
            value={userData.profession}
            onChange={handleChange}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: '20px' }}
          >
            Registrarse
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default UserRegistration;
