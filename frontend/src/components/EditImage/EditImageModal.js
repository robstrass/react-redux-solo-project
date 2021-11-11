import React, { useState } from 'react';
import { Modal } from '../../context/Modal.js';
import EditImage from './index.js';

function EditImageModal({ image }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick = {() => setShowModal(true)}>
                Edit
            </button>
            {showModal && (
                <Modal onClose = {() => setShowModal(false)}>
                    <EditImage
                        image = { image }
                        setShowModal = { setShowModal }
                    />
                </Modal>
            )}
        </>
    )
}

export default EditImageModal;
