import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';

import { addOneImage } from '../../store/userImages';
import { allAlbums } from '../../store/albums';

import './AddImage.css';

function AddImage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const albums = useSelector(state => Object.values(state.albums.all));
    const { id } = sessionUser;
    const [imageUrl, setImageUrl] = useState('');
    const [content, setContent] = useState('');
    const [albumId, setAlbumId] = useState();
    const [errors, setErrors] = useState([]);

    const validate = () => {
        const validationErrors = [];
        if (!imageUrl) validationErrors.push('Please add an Image Url.');
        if (!content) validationErrors.push('Please add some content for your image.');

        return validationErrors;
    }

    useEffect(() => {
        dispatch(allAlbums(id));
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = validate();

        if (errors && errors.length > 0) {
            return setErrors(errors)
        }

        const newImage = {
            userId: id,
            albumId,
            imageUrl,
            content
        }

        dispatch(addOneImage(newImage));
        history.push('/profile');
    }

    if (!sessionUser) return <Redirect to = '/' />;

    return (
        <div className = 'new-image-form-container'>
            <div className = 'new-image-form-div'>
                <p id = 'new-image-p'>Upload Image</p>
                {errors.length > 0 && (<div className = 'new-image-errors-div'>
                    <ul className = 'new-image-errors-ul'>
                        { errors.map(error => (
                            <li
                                className = 'new-image-error-li'
                                key = { error }
                            >
                                { error }
                            </li>
                        ))}
                    </ul>
                </div>)}
                <form
                    className = 'new-image-form'
                    onSubmit = { handleSubmit }
                >
                    <input
                        className = 'new-image-field'
                        placeholder = 'Image URL'
                        value = { imageUrl }
                        onChange = { e => setImageUrl(e.target.value) }
                    />
                    <input
                        className = 'new-image-field'
                        placeholder = 'Content'
                        value = { content }
                        onChange = { e => setContent(e.target.value) }
                    />
                    {/* <input
                        className = 'new-image-field'
                        placeholder = 'AlbumId Placeholder (change)'
                        value = { albumId }
                        type = 'number'
                        onChange = { e => setAlbumId(e.target.value) }
                    /> */}
                    <select
                        value = { albumId }
                        onChange = {(e) => setAlbumId(e.target.value)}
                        className = 'new-image-field'
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
                        className = 'new-image-button'
                        type = 'submit'
                    >
                        Upload
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddImage;
