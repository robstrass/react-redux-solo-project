import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { randomGreeting, greetings } from './greetings';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    }

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    }

    return (
        <>
            <div className = 'profile-button' onClick = { openMenu }>
                {!showMenu && (
                    <i className="far fa-user-circle fa-2x"></i>
                )}
            </div>
            {showMenu && (
                <div className = 'profile-container'>
                    <ul className = 'profile-dropdown'>
                        <li className = 'showMenu-items'>
                            <i className="far fa-user-circle fa-lg"></i>
                        </li>
                        <li className = 'showMenu-items'>
                            {randomGreeting(greetings)}
                            <NavLink className = 'profile-nav' to = '/profile'>
                                 { user.username }
                            </NavLink>
                        </li>
                        <li className = 'showMenu-items'>
                            <i className="fas fa-envelope fa-lg"></i>
                            <p className = 'profile-email-p'>{ user.email }</p>
                        </li>
                        <li className = 'showMenu-items'>
                            <button className = 'profile-logout' onClick = { logout }>Log Out</button>
                        </li>
                    </ul>
                </div>
            )}
        </>
    );
}

export default ProfileButton
