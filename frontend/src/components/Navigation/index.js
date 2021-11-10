import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from '../../assets/Drivr-logo-cropped.png';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <div className = 'nav-authed-user-buttons'>
                <NavLink className = 'navbar-upload-button' to = '/upload'>
                    <i className = "fas fa-cloud-upload-alt fa-2x"></i>
                </NavLink>
                <ProfileButton user = { sessionUser } />
            </div>
        );
    } else {
        sessionLinks = (
            <>
                <div className = 'user-auth-div'>
                    <NavLink className = 'login' to = '/login'>Log In</NavLink>
                    <NavLink className = 'signup' to = '/signup'>Sign Up</NavLink>
                </div>
            </>
        )
    }

    return (
        <ul className = 'nav-bar'>
            <li className = 'logo-li'>
                <NavLink exact to = '/homepage'>
                    <img id = 'nav-logo' src = {logo} alt = 'Drivr Logo'/>
                </NavLink>
            </li>
            <li className = 'user-auth-li'>
                {isLoaded && sessionLinks}
            </li>
        </ul>
    )
}

export default Navigation;
