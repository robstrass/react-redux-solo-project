import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { addOneImage } from '../../store/userImages';

import './AddImage.css';

function AddImage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const { id } = sessionUser;
    const [imageUrl, setImageUrl] = useState('');
    const [content, setContent] = useState('');
    const [albumId, setAlbumId] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();

        const newImage = {
            userId: id,
            albumId,
            imageUrl,
            content
        }

        dispatch(addOneImage(newImage));
        history.push('/profile');
    }

    return (
        <div className = 'new-image-form-container'>
            <h3>Add an Image</h3>
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
            </form>
        </div>
    )
}

export default AddImage;
