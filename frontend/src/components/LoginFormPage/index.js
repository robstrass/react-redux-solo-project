import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import './LoginForm.css';
import dotLogo from '../../assets/Drivr-dot-logo.png';

function LoginFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (sessionUser) return (
        <Redirect to = "/" />
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);

        return dispatch(sessionActions.login({ credential, password }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    }

    return (
        <div className = 'login-container'>
            <form className = 'loginForm' onSubmit = {handleSubmit}>
                <img className = 'login-form-ele' src = { dotLogo } alt = 'dot logo'/>
                <p className = 'login-form-ele'>Log in to Drivr</p>
                <ul className = 'auth-errors login-form-ele'>
                    {errors.map((error, index) => <li key = {index} className = 'login-errors'>
                        {error}
                    </li>)}
                </ul>
                <input
                    className = 'login-input login-form-ele'
                    type = 'text'
                    value = { credential }
                    onChange = {(e) => setCredential(e.target.value)}
                    placeholder = 'Username or Email'
                    required
                />
                <input
                    className = 'login-input login-form-ele'
                    type = 'password'
                    value = { password }
                    onChange = {(e) => setPassword(e.target.value)}
                    placeholder = 'Password'
                    required
                />
                <button className = 'login-submit' type = 'submit'>Log In</button>
                <button className = 'login-submit' onClick = {() => {
                    setCredential('Demo-User');
                    setPassword('password')
                }}>Demo</button>
            </form>
        </div>
    )
}

export default LoginFormPage;
