import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { deleteImage } from '../../store/userImages';

import './DeleteImage.css';

function DeleteImage({ image, setShowModal }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const deleteSingleImage = (e) => {
        e.preventDefault();
        dispatch(deleteImage(image));
        history.push('/profile');
    }


    return (
        <div className = 'confirm-image-delete-container'>
            <div className = 'confirm-image-delete-div'>
                <p className = 'confirm-delete-image-text'>Are you sure you want to remove this image?</p>
                <div className = 'confirm-image-delete-buttons'>
                    <button
                        onClick = {deleteSingleImage}
                        className = 'delete-image-confirm'
                    >
                        Delete
                    </button>
                    <button
                        onClick = {() => setShowModal(false) }
                        className = 'cancel-delete-image'
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteImage;
