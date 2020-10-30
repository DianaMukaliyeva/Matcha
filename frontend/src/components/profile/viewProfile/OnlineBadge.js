import React from 'react';
import { Badge, Avatar } from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';

import Tooltip from '@material-ui/core/Tooltip';
import { profileStyles } from '../../../styles/profileStyles';
import UserAvatar from './UserAvatar';

const StyledBadge = withStyles((theme) => ({
    badge: {
        backgroundColor: '#44b700',
        color: '#44b700',
        marginBottom: '-20px',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: '$ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}))(Badge);

const StyledOfflineBadge = withStyles((theme) => ({
    badge: {
        backgroundColor: 'black',
        color: 'black',
        marginBottom: '-20px',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            border: '1px solid grey',
            content: '""',
        },
    },
}))(Badge);

const OnlineBadge = ({ profile, handleClickOpen }) => {
    const classesProf = profileStyles();
    const date = new Date(profile.last_seen).toLocaleString();

    if (profile.online === 0)
        return (
            <Tooltip title={`last seen ${date}`}>
                <StyledOfflineBadge
                    className={classesProf.avatarImageStyle}
                    overlap="circle"
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    variant="dot">
                    <UserAvatar handleClickOpen={handleClickOpen} />
                </StyledOfflineBadge>
            </Tooltip>
        );
    else {
        return (
            <StyledBadge
                className={profile.online === 1 ? classesProf.avatarImageStyle : ''}
                overlap="circle"
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                variant="dot">
                <Avatar
                    className={classesProf.avatarImageStyle}
                    onClick={handleClickOpen}
                    alt="user profile"
                    src={profile.profile_pic_path}
                />
            </StyledBadge>
        );
    }
};

export default OnlineBadge;