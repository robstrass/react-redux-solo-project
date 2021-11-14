import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom'

import { editOneImage } from '../../store/userImages';
import { allAlbums } from '../../store/albums';

import './EditImage.css';

function EditImage({ image, setShowModal }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const sessionUser = useSelector(state => state.session.user);
    const albums = useSelector(state => Object.values(state.albums.all));
    const { id } = sessionUser;
    const [content, setContent] = useState(image.content);
    const [albumId, setAlbumId] = useState('');
    const [errors, setErrors] = useState([]);

    console.log('albums', albums)
    const validate = () => {
        const validationErrors = [];
        if (!content) validationErrors.push('Please provide content for your image.');

        return validationErrors;
    }

    useEffect(() => {
        dispatch(allAlbums(id));
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = validate();

        if (errors && errors.length > 0) {
            return setErrors(errors);
        }

        const editedImage = {
            id: image.id,
            userId: id,
            albumId,
            image: image.imageUrl,
            content,
        }

        dispatch(editOneImage(editedImage));
        history.push('/profile');
    }

    if (!sessionUser) return <Redirect to = '/' />

    return (
        <div className = 'edit-image-form-container'>
            <div className = 'edit-image-form-div'>
                <p id = 'edit-image-p'>Edit Image</p>
                {errors.length > 0 && (
                    <div className = 'edit-image-errors-div'>
                        <ul className = 'edit-image-errors-ul'>
                            { errors.map(error => (
                                <li
                                    className = 'edit-image-error-li'
                                    key = { error }
                                >
                                    {error}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <form
                    className = 'edit-image-form'
                    onSubmit = { handleSubmit }
                >
                    <input
                        className = 'edit-image-field'
                        placeholder = 'Content'
                        value = { content }
                        onChange = { e => setContent(e.target.value) }
                    />
                    {/* <input
                        className = 'edit-image-field'
                        placeholder = 'AlbumId Placeholder (change)'
                        value = { albumId }
                        onChange = { e => setAlbumId(e.target.value) }
                    /> */}
                    <select
                        value = { albumId }
                        onChange = {e => setAlbumId(e.target.value)}
                        className = 'edit-image-field'
                    >
                        <option value = ''>
                            none
                        </option>
                        { albums?.map(album => (
                            <option
                                value = { album.id }
                                key = { album.id }
                            >
                                { album.title }
                            </option>
                        ))}
                    </select>
                    <button
                        className = 'edit-image-field edit-image-submit'
                        type = 'submit'
                    >
                        Edit
                    </button>
                    <button
                        onClick = {() => setShowModal(false)}
                        className = 'edit-image-field edit-image-cancel'
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    )
}

export default EditImage;
