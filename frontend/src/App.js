import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignUpFormPage';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import ImageDetail from './components/ImageDetail';
import UserProfile from './components/UserProfile';
import UserImage from './components/UserImage';
import AddImage from './components/AddImage';
import * as sessionActions from './store/session';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
    <Navigation isLoaded = { isLoaded } />
    {isLoaded && (
      <Switch>
        <Route path = '/homepage'>
          <HomePage />
        </Route>
        <Route path = '/login'>
          <LoginFormPage />
        </Route>
        <Route path = '/signup'>
          <SignupFormPage />
        </Route>
        <Route path = '/images/:id'>
          <ImageDetail />
        </Route>
        <Route exact path = '/profile'>
          <UserProfile />
        </Route>
        <Route path = '/profile/images/:id'>
          <UserImage />
        </Route>
        <Route path = '/upload'>
          <AddImage />
        </Route>
      </Switch>
    )}
    </>
  );
}

export default App;
