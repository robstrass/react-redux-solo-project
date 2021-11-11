import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Redirect, useHistory } from 'react-router-dom';

import { loadOneImage } from '../../store/userImages';
import DeleteImageModal from '../DeleteImage/DeleteImageModal';
import EditImageModal from '../EditImage/EditImageModal';
// import { Modal } from '../../context/Model';
// import DeleteImage from '../DeleteImage';

import './UserImage.css';

function UserImage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const image = useSelector((state) => (state.userImage.current));
    console.log('image', typeof image)
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false)

    useEffect(() => (
        dispatch(loadOneImage(id))
    ), [dispatch, id]);

    const sessionUser = useSelector(state => state.session.user);
    if (!sessionUser) return <Redirect to = '/' />;

    // doesnt work
    if (image === {}) {
        history.push('/profile');
        return;
    }

    return (
        <div className = 'profile-single-img-container'>
            <div className = 'profile-single-div-style'>
                <div className = 'profile-single-img-div'>
                    <img
                        className = 'profile-single-img'
                        src = {image.imageUrl}
                        alt = 'car'
                    />
                </div>
                <div className = 'profile-single-img-content'>{image.content}</div>
                <div className = 'profile-single-img-buttons'>
                    <EditImageModal image = { image } />
                    {/* { showModal && (
                        <Modal onClose = {() => setShowModal(false)}>
                            <h2>hi</h2>
                        </Modal>
                    )} */}
                    <DeleteImageModal image = { image } />
                </div>
            </div>
        </div>
    )
}

export default UserImage;
