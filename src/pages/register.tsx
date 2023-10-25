import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button } from '@mui/material';
import { getAuth, sendEmailVerification } from 'firebase/auth';
import app from '../../firebase/config';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';

function UserRegistration() {
  const auth = getAuth(app)
  const [createUserWithEmailPassword, user, loading, error]
    = useCreateUserWithEmailAndPassword(auth)

  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    profession: '',
    email: '',
    password: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await createUserWithEmailPassword(userData.email, userData.password);
    //Agregar datos en firestore
    const db = getFirestore(app)
    await setDoc(doc(db, 'usuarios', response!.user.uid), {
      "apellidos": userData.lastName,
      "nombre": userData.firstName,
      "edad": Number(userData.age),
      "profesion": userData.profession
    });
    if (response?.user !== null) {
      await sendEmailVerification(response!.user)
    }
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
            label="Correo"
            variant="outlined"
            margin="normal"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Contrasena"
            variant="outlined"
            margin="normal"
            name="password"
            value={userData.password}
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
