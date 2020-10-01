import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { Container, Grid, Box } from '@material-ui/core';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/profile/CreateAccount';
import Login from './components/auth/Login';
import ForgotPwd from './components/auth/ForgotPwd';
import UpdatePwd from './components/auth/UpdatePwd';
import Likes from './components/likes/Likes';
import Matches from './components/matches/Matches';
import Profile from './components/profile/Profile';
import Chat from './components/chat/Chat';
import Alert from './components/layout/Alert';
import Message from './components/layout/Message';
import PrivateRoute from './components/routing/PrivateRoute';
// import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';
import ProfileCreation from './components/profile/CreateProfile';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import theme from './styles/custom';
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';

// setAuthToken(localStorage.getItem('token'));

const App = () => {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <Router>
                    <CssBaseline />
                    <Navbar />
                    <Container maxWidth='md'>
                        <Box display='flex' flexDirection='column' minHeight='100vh'>
                            <Box flexGrow={1}>
                                <Grid container spacing={1}>
                                    <Grid container item md={6} sm={12}>
                                        <Route exact path='/' component={Landing} />
                                        <section className='container'>
                                            <Alert />
                                            <Switch>
                                                <Route exact path='/login' component={Login} />
                                                <Route exact path='/register' component={Register} />
                                                <Route exact path='/forgetPwd' component={ForgotPwd} />
                                                <Route exact path='/updatePwd' component={UpdatePwd} />
                                                <Route exact path='/message' component={Message} />
                                                <PrivateRoute exact path='/messages' component={Chat} />
                                                <PrivateRoute exact path='/likes' component={Matches} />
                                                <PrivateRoute exact path='/profile' component={Profile} />
                                                <Route exact path='/complete' component={ProfileCreation} />
                                                <PrivateRoute exact path='/matches' component={Matches} />
                                            </Switch>
                                        </section>
                                    </Grid>
                                    <Grid container item md={6} sm={12}>
                                        <Box overflow='hidden'>
                                            <img className='circle' src={require('./circle.png')} alt='circle' />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box>
                                <Footer />
                            </Box>
                        </Box>
                    </Container>
                </Router>
            </Provider>
        </ThemeProvider>
    );
};

export default App;
