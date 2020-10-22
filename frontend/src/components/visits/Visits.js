import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { AppBar, Tabs, Tab, Typography, Box, Container } from '@material-ui/core';
import Match from '../common/matchGallery/GetMatches';
import { getNotifications, updateNotifications } from '../../actions/notifications';

const Visits = ({ match, history, socket, getNotifications, updateNotifications, notifications }) => {
    const { page } = match.params;
    console.log('page', page);

    const indexToTabName = ['newvisits', 'allvisits', 'myvisits'];

    const [selectedTab, setValue] = useState(indexToTabName.indexOf(page));

    useEffect(() => {
        // socket.on('UPDATE_NOTIFICATIONS', type => {
        //     if (type === 'visit') {
        //         console.log('clear visits');
        //         updateNotifications('visit');
        //     }
        // });
        console.log('in visits sizhu');
        updateNotifications('visit');
    }, [updateNotifications]);

    const handleChange = (event, newValue) => {
        console.log(newValue);
        history.push(`/visits/${indexToTabName[newValue]}`);
        setValue(newValue);
    };

    return (
        <div>
            <AppBar color="secondary" position="static">
                <Box p={2} justifyContent="center">
                    <Typography variant="h6">Visit History</Typography>
                </Box>
                <Tabs value={selectedTab} onChange={handleChange}>
                    <Tab label="New visits" />
                    <Tab label="All visits" />
                    <Tab label="My visits" />
                </Tabs>
            </AppBar>
            <Container>
                {selectedTab === 0 && (
                    <Box p={3}>
                        <Match route="/match/visitedMe" filterIsOn={0} />
                    </Box>
                )}
                {selectedTab === 1 && (
                    <Box p={3}>
                        <Match route="/match/visitedMe" filterIsOn={0} />
                    </Box>
                )}
                {selectedTab === 2 && (
                    <Box p={3}>
                        <Match route="/match/visitedByMe" filterIsOn={0} />
                    </Box>
                )}
            </Container>
        </div>
    );
};

Visits.propTypes = {
    getNotifications: PropTypes.func.isRequired,
    updateNotifications: PropTypes.func.isRequired,
    notifications: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    notifications: state.notifications,
});

export default connect(mapStateToProps, { updateNotifications, getNotifications })(Visits);
