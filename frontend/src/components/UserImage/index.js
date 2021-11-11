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

    useEffect(() => (
        dispatch(loadOneImage(id))
    ), [dispatch, id]);

    const sessionUser = useSelector(state => state.session.user);
    if (!sessionUser) return <Redirect to = '/' />;

    console.log('single image', image)
    if (image.redirect) return <Redirect to = '/profile' />

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
                    <DeleteImageModal image = { image } />
                </div>
            </div>
        </div>
    )
}

export default UserImage;
