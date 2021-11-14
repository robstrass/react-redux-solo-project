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
        <div className = 'new-album-form-container'>
            <div className = 'new-album-form-div'>
                <p id = 'new-album-p'>Create Album</p>
                { errors.length > 0 && (<div className = 'new-album-errors-div'>
                    <ul className = 'new-album-errors-ul'>
                        { errors.map(error => (
                            <li
                                className = 'new-album-error-li'
                                key = { error }
                            >
                                { error }
                            </li>
                        ))}
                    </ul>
                </div>) }
                <form
                    className = 'new-album-form'
                    onSubmit = { handleSubmit }
                >
                    <input
                        className = 'new-album-field'
                        placeholder = 'Title'
                        value = { title }
                        onChange = { e => setTitle(e.target.value) }
                    />
                    <button
                        className = 'new-album-button'
                        type = 'submit'
                    >
                        Create
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddAlbum;
