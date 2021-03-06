import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Box, Typography, Grid, Container } from '@material-ui/core';

import { getConversations } from '../../actions/chat';
import { getMessageNotifications } from '../../actions/notifications';
import { chatStyles } from '../../styles/chatStyles';
import Conversations from './Conversations';
import PrivateChat from './PrivateChat';
import Spinner from '../layout/Spinner';

const Chat = () => {
    const { auth, notifications, chat } = useSelector((state) => state);
    const { conversations, loading } = chat;
    const history = useHistory();
    const dispatch = useDispatch();
    const [currentConversation, setCurrentConversation] = useState(0);
    const [lastMessage, setLastMessage] = useState({ text: '', chatId: 0 });
    const [active, setActive] = useState(null);
    const [partnerTyping, setPartnerTyping] = useState({
        typing: false,
        chatId: 0,
    });
    const classesChat = chatStyles();
    let { userId } = useParams();

    useEffect(() => {
        if (userId !== 0 && conversations.some((el) => el.partner_id === userId)) {
            setCurrentConversation(userId);
        }
        setActive(currentConversation);
    }, [userId, conversations, currentConversation]);

    useEffect(() => {
        auth.socket.on('TYPING_NOTIFICATION', (chatId, typing) => {
            setPartnerTyping({ typing: typing, chatId: chatId });
        });
    }, [userId, conversations, auth.socket]);

    useEffect(() => {
        let isMounted = true;

        dispatch(getConversations());
        dispatch(getMessageNotifications());
        auth.socket.on('UPDATE_NOTIFICATIONS', (type, chatId, text) => {
            if (isMounted && type === 'message') {
                if (text) setLastMessage({ text: text, chatId: chatId });
                dispatch(getMessageNotifications());
            }
        });

        return () => {
            auth.socket.off('TYPING_NOTIFICATION');
            isMounted = false;
        };
    }, [auth.socket, dispatch]);

    const handleChange = (event, newUserId, senderId) => {
        setCurrentConversation(newUserId);
        if (newUserId === 0) {
            history.push('/messages');
        } else {
            history.push('/messages/' + newUserId);
            if (notifications.message > 0) {
                auth.socket.emit('SEE_CONVERSATION', auth.user.userId, senderId);
            }
        }
    };

    return (
        <Box minHeight="80vh" display="flex" flexDirection="column">
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                pl={8}
                boxShadow={6}
                className={classesChat.header}
            >
                <Container>
                    <Grid
                        container
                        item
                        sm={4}
                        xs={12}
                        justify="space-around"
                        direction="column"
                        alignItems="flex-start"
                        spacing={1}
                    >
                        <Typography variant="h5">Messages</Typography>
                    </Grid>
                </Container>
            </Box>
            <Box flexGrow={1} display="flex" p={5}>
                <Container>
                    {loading ? (
                        <Spinner />
                    ) : conversations.length === 0 ? (
                        <Box textAlign="center">No conversations yet</Box>
                    ) : (
                        <Grid container spacing={4} className={classesChat.justifySpaceAround}>
                            <Grid
                                container
                                item
                                sm={4}
                                xs={12}
                                direction="column"
                                justify="space-around"
                                alignItems="center"
                                spacing={1}
                                className={classesChat.leftSide}
                            >
                                <Typography className={classesChat.titleChats} variant="h6">
                                    Recent conversations
                                </Typography>
                                <Box className={classesChat.listBox}>
                                    <Conversations
                                        active={active}
                                        socket={auth.socket}
                                        partnerTyping={partnerTyping}
                                        messageNotifications={notifications.messages}
                                        conversations={conversations}
                                        handleChange={handleChange}
                                        lastMessage={lastMessage}
                                    />
                                </Box>
                            </Grid>
                            <Grid
                                item
                                container
                                justify="center"
                                alignItems="center"
                                sm={6}
                                xs={12}
                                className={classesChat.rightSide}
                            >
                                <PrivateChat
                                    handleChange={handleChange}
                                    notifications={notifications}
                                    currentConversation={currentConversation}
                                    setCurrentConversation={setCurrentConversation}
                                />
                            </Grid>
                        </Grid>
                    )}
                </Container>
            </Box>
        </Box>
    );
};

export default Chat;
