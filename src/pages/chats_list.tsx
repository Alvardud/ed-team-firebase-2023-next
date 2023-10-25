import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, List, ListItem, ListItemText } from '@mui/material';
import { useRouter } from 'next/router';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, getFirestore } from 'firebase/firestore';
import app from '../../firebase/config';

function ChatList() {
    const [usuarios, loading, error] = useCollection(collection(getFirestore(app), 'usuarios'))
    const router = useRouter()

    const [searchQuery, setSearchQuery] = useState('');
    const [chats, setChats] = useState([
        { id: 1, name: 'Chat 1' },
        { id: 2, name: 'Chat 2' },
        { id: 3, name: 'Chat 3' },
        // Agrega más chats aquí
    ]);

    const filteredChats = chats.filter(chat =>
        chat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Container maxWidth="lg">
            <Paper elevation={3} style={{ padding: '20px', marginTop: '50px' }}>
                <Typography variant="h5" gutterBottom>
                    Lista de Chats
                </Typography>
                <TextField
                    fullWidth
                    label="Buscar Chats"
                    variant="outlined"
                    margin="normal"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                {usuarios && (<List>
                    {usuarios.docs.map((chat: any, index) => (
                        <ListItem key={index} onClick={() => {
                            router.push(`/chat/${chat.id}`)
                        }}>
                            <ListItemText>{chat.data()['nombre']}</ListItemText>
                        </ListItem>
                    ))}
                </List>)}
            </Paper>
        </Container>
    );
}

export default ChatList;
