import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, List, ListItem, ListItemText, Grid, Button } from '@mui/material';

function ChatPage() {
  const [messages, setMessages] = useState<Array<any>>([]);
  const [newMessage, setNewMessage] = useState('');
  const [image, setImage] = useState<any>(null);

  const handleSendMessage = () => {
    if (newMessage) {
      setMessages([...messages, { text: newMessage, sender: 'user' }]);
      setNewMessage('');
    }
  };

  const handleImageUpload = (e:any) => {
    const file = e.target.files[0];
    if (file) {
      // Aquí puedes procesar y cargar la imagen
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '50px', height: '400px', overflow: 'auto' }}>
        <Typography variant="h5" gutterBottom>
          Chat
        </Typography>
        <List>
          {messages.map((message, index) => (
            <ListItem key={index} style={{ justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start' }}>
              <Paper elevation={3} style={{ padding: '10px' }}>
                <ListItemText
                  primary={message.text}
                  secondary={message.sender === 'user' ? 'Tú' : 'Otro Usuario'}
                />
              </Paper>
            </ListItem>
          ))}
        </List>
      </Paper>
      <Grid container spacing={2} style={{ marginTop: '20px' }} alignItems={'center'} direction={'row'}>
        <Grid item xs={8}>
          <TextField
            fullWidth
            label="Mensaje"
            variant="outlined"
            margin="normal"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            component="label"
          >
            Subir Imagen
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageUpload}
            />
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button onClick={handleSendMessage} variant="contained"
            color="primary">
            Enviar
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ChatPage;
