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
            <ProfileButton user = { sessionUser } />
        );
    } else {
        sessionLinks = (
            <>
                <div className = 'user-auth-div'>
                    <NavLink className = 'login' to = '/login'>Log In</NavLink>
                    <NavLink className = 'signup' to = '/signup'>Sign Up
                        {/* <button id = 'signup-button'>Sign Up</button> */}
                    </NavLink>
                </div>
            </>
        )
    }

    return (
        <ul className = 'nav-bar'>
            <li className = 'logo-li'>
                <NavLink exact to = '/'>
                    <img src = {logo} alt = 'Drivr Logo'/>
                </NavLink>
            </li>
            <li className = 'user-auth-li'>
                {isLoaded && sessionLinks}
            </li>
        </ul>
    )
}

export default Navigation;
