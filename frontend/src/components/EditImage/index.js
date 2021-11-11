import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom'

import { editOneImage } from '../../store/userImages';

import './EditImage.css';

function EditImage({ image }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const sessionUser = useSelector(state => state.session.user);
    const { id } = sessionUser;
    // const [imageUrl, setImageUrl] = useState('');
    const [content, setContent] = useState(image.content);
    const [albumId, setAlbumId] = useState();
    console.log('edit image', image)

    const handleSubmit = (e) => {
        e.preventDefault();

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
                    <input
                        className = 'edit-image-field'
                        placeholder = 'AlbumId Placeholder (change)'
                        value = { albumId }
                        onChange = { e => setAlbumId(e.target.value) }
                    />
                    <button
                        className = 'edit-image-submit'
                        type = 'submit'
                    >
                        Edit
                    </button>
                    <button
                        className = 'edit-image-cancel'
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    )
}

export default EditImage;
