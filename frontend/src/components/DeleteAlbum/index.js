import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { deleteAlbum } from '../../store/albums';

import './DeleteAlbum.css'

function DeleteAlbum({ album, setShowModal }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const deleteAlbumConfirm = (e) => {
        e.preventDefault();
        dispatch(deleteAlbum(album));
        history.push('/albums');
    }

    return (
        <div className = 'confirm-album-delete-container'>
            <div className = 'confirm-album-delete-div'>
                <p className = 'confirm-delete-album-text'>
                    Are you sure you want to remove this album?
                </p>
                <div className = 'confirm-album-delete-buttons'>
                    <button
                        onClick = { deleteAlbumConfirm }
                        className = 'delete-album-confirm'
                    >
                        Delete
                    </button>
                    <button
                        onClick = {() => setShowModal(false)}
                        className = 'cancel-delete-album'
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteAlbum;
