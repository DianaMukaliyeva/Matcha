import React, { useState } from 'react';
import { ListItem, ListItemText, ListItemAvatar, Avatar, Typography } from '@material-ui/core';

const ConversationBox = ({ conversation, isActive, onClick }) => {
    const date = new Date(conversation.time_sent).toLocaleDateString();
    return (
        <ListItem
            style={{ borderBottom: '1px solid #003781' }}
            button
            onClick={e => onClick(e, conversation.chat_id)}
            alignItems="flex-start">
            <ListItemAvatar>
                <Avatar alt={conversation.partner_username} src="/images/Photo_1601037282389_683.png" />
            </ListItemAvatar>
            <ListItemText
                primary={
                    <>
                        {conversation.partner_username}{' '}
                        <div style={{ float: 'right', color: '#b5bad3' }}>last seen</div>
                    </>
                }
                secondary={
                    <>
                        {conversation.last_message} <span style={{ float: 'right' }}>5</span>
                    </>
                }
            />
        </ListItem>
    );
};

export default ConversationBox;
