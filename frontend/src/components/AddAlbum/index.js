import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';

import { addOneAlbum } from '../../store/albums';

import './AddAlbum.css';

function AddAlbum() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const { id } = sessionUser;

    const [title, setTitle] = useState('');
    const [errors, setErrors] = useState('');

    const validate = () => {
        const validationErrors = [];
        if (!title) validationErrors.push('Please name your album');
        if (title.length > 255) validationErrors.push('Title too long!');

        return validationErrors;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = validate();

        if (errors && errors.length > 0) {
            return setErrors(errors);
        }

        const newAlbum = {
            userId: id,
            title
        }

        dispatch(addOneAlbum(newAlbum));
        history.push('/albums');
    }

    if (!sessionUser) return <Redirect to = '/' />;

    return (
        <h1>ballsack</h1>
    )
}

export default AddAlbum;
