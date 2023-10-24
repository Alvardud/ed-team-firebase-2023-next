import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, List, ListItem, ListItemText } from '@mui/material';
import { useRouter } from 'next/router';

function ChatList() {
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
                <List>
                    {filteredChats.map(chat => (
                        <ListItem key={chat.id} onClick={() => {
                            router.push('/chat/id')
                        }}>
                            <ListItemText primary={chat.name} />
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Container>
    );
}

export default ChatList;
