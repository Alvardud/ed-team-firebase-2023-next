import React, { useEffect, useState } from 'react';
import { Container, Paper, Typography, TextField, List, ListItem, ListItemText, Grid, Button } from '@mui/material';
import { useRouter } from 'next/router';
import { useCollection, useCollectionData } from 'react-firebase-hooks/firestore';
import { useUploadFile } from 'react-firebase-hooks/storage'
import { addDoc, collection, doc, getFirestore, query, where } from 'firebase/firestore';
import app from '../../../firebase/config';
import { getAuth } from 'firebase/auth';
import { getDownloadURL, getStorage, ref as storageRef } from 'firebase/storage'

function ChatPage() {
  const auth = getAuth(app)
  const [messages, setMessages] = useState<Array<any>>([]);
  const [newMessage, setNewMessage] = useState('');
  const [image, setImage] = useState<any>(null);

  const router = useRouter()
  const { id } = router.query
  const [mensajes, loading, error] = useCollection(query(collection(getFirestore(app), 'mensajes'), where('usuario_dest', '==', id ?? '')))

  const handleSendMessage = async () => {
    const db = getFirestore(app)
    await addDoc(collection(db, 'mensajes'), {
      "fecha": Date.now().toString(),
      "mensaje": newMessage,
      "tipo": 'texto',
      "url_imagen": '',
      'usuario_dest': id,
      'usuario_origen': auth.currentUser?.uid
    });
  };

  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      // Aquí puedes procesar y cargar la imagen
      setImage(URL.createObjectURL(file));
    }
  };

  // imagen -----------------------------
  const [uploadFile, loadingFile, snapshot, errorFile] = useUploadFile()
  const [selectedFile, setSelectedFile] = useState<File>();
  const upload = async () => {
    if (selectedFile) {
      await uploadFile(storageRef(getStorage(app), `${Date.now().toString()}.jpg`), selectedFile, {
        contentType: 'image/jpeg'
      })
      const url = await getDownloadURL(storageRef(getStorage(app), `${Date.now().toString()}.jpg`))
      const db = getFirestore(app)
      await addDoc(collection(db, 'mensajes'), {
        "fecha": Date.now().toString(),
        "mensaje": '',
        "tipo": 'imagen',
        "url_imagen": url,
        'usuario_dest': id,
        'usuario_origen': auth.currentUser?.uid
      });
    }
  }


  useEffect(() => {
    upload()
  }, [
    selectedFile
  ])

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '50px', height: '400px', overflow: 'auto' }}>
        <Typography variant="h5" gutterBottom>
          Chat
        </Typography>
        {mensajes && (<List>
          {mensajes.docs.map((message, index) => (
            <ListItem
              key={index}
            // style={{ justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start' }}
            >
              <Paper elevation={3} style={{ padding: '10px' }}>
                {message.data()['tipo'] === 'imagen' ?
                  (<img src={message.data()['url_imagen']} style={{width:'100px', height:'100px'}}></img>) :
                  (<ListItemText
                    primary={message.data()['mensaje']}
                  // secondary={message.sender === 'user' ? 'Tú' : 'Otro Usuario'}
                  />)}
              </Paper>
            </ListItem>
          ))}
        </List>)}
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
              onChange={(e) => {
                const file = e.target.files ? e.target.files[0] : undefined;
                setSelectedFile(file);
              }}
              accept="image/*"
              style={{ display: 'none' }}
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
