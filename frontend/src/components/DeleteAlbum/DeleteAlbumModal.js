import React, { useState } from 'react';
import { Modal } from '../../context/Modal.js'
import DeleteAlbum from './index.js';

function DeleteAlbumModal({ album }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button
                className = 'album-delete-button'
                onClick = {() => setShowModal(true)}
            >
                Delete
            </button>
            { showModal && (
                <Modal onClise = {() => setShowModal(false)}>
                    <DeleteAlbum
                        album = { album }
                        setShowModal = { setShowModal }
                    />
                </Modal>
            )}
        </>
    )
}

export default DeleteAlbumModal;
