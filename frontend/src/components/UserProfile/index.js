import React, { useEffect } from 'react';
import { Redirect, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { loadImages } from '../../store/userImages';

import './UserProfile.css';

function UserProfile() {
    const dispatch = useDispatch();
    const images = useSelector((state) => Object.values(state.userImage.all));
    const sessionUser = useSelector(state => state.session.user);

    let userId;
    if (sessionUser) {
        userId = sessionUser.id;
    }

    useEffect(() => {
        dispatch(loadImages(userId))
    }, [dispatch, userId]);

    if (!sessionUser) return <Redirect to = '/' />;


    return (
        <div className='profile-page-container'>
            <div className = 'profile-headline-div'>
                <h1 className = 'profile-headline'>
                    Your Photos
                </h1>
            </div>
            <div className = 'profile-all-images'>
                { images.length > 0 ? images.map(image => (
                    <NavLink
                        className = 'profile-nav-wrapper'
                        key = {image.id}
                        to = {`/profile/images/${image.id}`}
                    >
                        <img
                            src = { image.imageUrl }
                            alt = 'car'
                            className = 'profile-images'
                        />
                        <div className='profile-image-content'>
                            {image.content}
                        </div>
                    </NavLink>
                )): null}
            </div>
        </div>
    )
}

export default UserProfile;
