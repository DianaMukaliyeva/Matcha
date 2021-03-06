import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import { Box, Button, Typography, useMediaQuery } from '@material-ui/core';

import { googleLogin } from '../../actions/auth';
import { btnStyles } from '../../styles/btnStyles';
import { systemStyles } from '../../styles/systemStyles';
import { setSnackbar } from '../../actions/setsnackbar';
import Spinner from './Spinner';
import google from '../../images/google.png';

const Landing = ({ history }) => {
    const dispatch = useDispatch();
    const { isAuthenticated, loading } = useSelector((state) => state.auth);
    const classes = btnStyles();
    const classesSystem = systemStyles();
    const isMobile = useMediaQuery('(max-width:600px)');

    const handleRedirect = (newRoute) => {
        history.push(newRoute);
    };

    if (isAuthenticated) {
        return <Redirect to="/matches" />;
    }

    const responseGoogle = (googleUser) => {
        const res = dispatch(googleLogin(googleUser));
        if (res && res.error) {
            dispatch(setSnackbar(true, 'error', res.error));
        }
    };

    return loading ? (
        <Spinner />
    ) : (
        <Box pt="200px" display="flex" flexDirection="column" textAlign="center">
            <Typography variant={isMobile ? 'h5' : 'h4'} className={classesSystem.infoColor}>
                Your love Is Written
            </Typography>
            <Typography variant={isMobile ? 'h4' : 'h3'}>In The Stars</Typography>
            <Button
                onClick={() => handleRedirect('/register')}
                className={`${classes.mainButton} ${classes.secondButton}`}>
                Create Account
            </Button>
            <Typography variant="h6">or</Typography>

            <Button onClick={() => handleRedirect('/login')} className={classes.mainButton}>
                Log in
            </Button>
            <GoogleLogin
                render={(renderProps) => (
                    <Button
                        onClick={renderProps.onClick}
                        className={`${classes.mainButton} ${classes.googleBtn}`}>
                        <img className={classesSystem.img} alt="google" src={google} />
                        Log in with Google
                    </Button>
                )}
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </Box>
    );
};

export default Landing;
