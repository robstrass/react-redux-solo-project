import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import * as sessionActions from '../../store/session';

import './SignupForm.css';
import dotLogo from '../../assets/Drivr-dot-logo.png';

function SignupFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [credentials, setCredentials] = useState('');
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to = '/'/>;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({
                email, username, password
            }))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                });
        }
        return setErrors(['Passwords do not match!']);
    };

    return (
        <div className = 'signup-container'>
            <form className = 'signupForm' onSubmit = { handleSubmit }>
                <img className = 'signup-form-ele' src = { dotLogo } alt = 'dot logo'/>
                <p className = 'signup-form-ele'>Sign Up for Drivr</p>
                <ul className = 'auth-errors sign-form-ele'>
                    {errors.map((error, index) => <li key = {index} className = 'signup-errors'>
                        {error}
                    </li>)}
                </ul>
                <input
                    className = 'signup-input signup-form-ele'
                    type = 'text'
                    value = { email }
                    onChange = {e => setEmail(e.target.value)}
                    placeholder = 'Email'
                    required
                />
                <input
                    className = 'signup-input signup-form-ele'
                    type = 'text'
                    value = { username }
                    onChange = {e => setUsername(e.target.value)}
                    placeholder = 'Username'
                    required
                />
                <input
                    className = 'signup-input signup-form-ele'
                    type = 'password'
                    value = { password }
                    onChange = {e => setPassword(e.target.value)}
                    placeholder = 'Password'
                    required
                />
                <input
                    className = 'signup-input signup-form-ele'
                    type = 'password'
                    value = { confirmPassword }
                    onChange = {e => setConfirmPassword(e.target.value)}
                    placeholder = 'Confirm Password'
                    required
                />
                <button className = 'signup-submit' type = 'submit'>Sign Up</button>
                <NavLink className = 'login-redirect' to = '/login'>Demo</NavLink>
            </form>
        </div>
    );
}

export default SignupFormPage;
