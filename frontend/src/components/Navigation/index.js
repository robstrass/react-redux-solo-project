import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from '../../assets/Drivr-logo-cropped.png';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    let leftNavLinks;
    if (sessionUser) {
        sessionLinks = (
            <div className = 'nav-authed-user-buttons'>
                <NavLink className = 'navbar-upload-button' to = '/profile/images/upload'>
                    <i className = "fas fa-cloud-upload-alt fa-2x"></i>
                </NavLink>
                <NavLink className = 'navbar-albums-button' to = '/albums'>
                    <i className = "fas fa-images fa-2x"></i>
                </NavLink>
                <ProfileButton user = { sessionUser } />
            </div>
        );
        leftNavLinks = (
            <div className = 'nav-left-buttons'>
                <NavLink className = 'navbar-explore-button' to = '/homepage'>
                    <i className = "far fa-compass fa-2x"></i>
                </NavLink>
            </div>
        )
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
                <div className = 'nav-left-container'>
                    <NavLink exact to = '/homepage'>
                        <img id = 'nav-logo' src = {logo} alt = 'Drivr Logo'/>
                    </NavLink>
                    {isLoaded && leftNavLinks}
                </div>
            </li>
            <li className = 'portfolio-li'>
                <a
                    className = 'portfolio-links'
                    href = 'https://github.com/robstrass'
                    target = '_blank'
                    rel = 'noreferrer'
                >
                    <i className = "fab fa-github fa-2x"></i>
                </a>
                <a
                    className = 'portfolio-links'
                    href = 'https://www.linkedin.com/in/robstrasser-'
                    target = '_blank'
                    rel = 'noreferrer'
                >
                    <i className = "fab fa-linkedin fa-2x"></i>
                </a>
            </li>
            <li className = 'user-auth-li'>
                {isLoaded && sessionLinks}
            </li>
        </ul>
    )
}

export default Navigation;
