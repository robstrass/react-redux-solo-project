import React, { useState } from 'react';
import { Modal } from '../../context/Modal.js';
import DeleteImage from './index';

function DeletePhotoModal({ image }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button
                className = 'profile-image-delete-button'
                onClick = {() => setShowModal(true)}>
                Delete
            </button>
            {showModal && (
                <Modal onClose = {() => setShowModal(false)}>
                    <DeleteImage
                        image = { image }
                        setShowModal = { setShowModal }
                    />
                </Modal>
            )}
        </>
    )
}

export default DeletePhotoModal;
