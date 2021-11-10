import React, { useEffect } from 'react';
import { Redirect, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { loadImages } from '../../store/userImages';

import './UserProfile.css';

function UserProfile() {
    const dispatch = useDispatch();
    const images = useSelector((state) => Object.values(state.userImage.all));
    console.log('images', images)
    const sessionUser = useSelector(state => state.session.user);
    const userId = sessionUser.id;

    useEffect(() => {
        dispatch(loadImages(userId))
    }, [dispatch, userId]);

    if (!sessionUser) return <Redirect to = '/' />;


    return (
        <div className = 'profile-all-images'>
            { images.length > 0 ? images.map(image => (
                <NavLink
                    className = 'profile-nav-wrapper'
                    key = {image.id}
                    to = {`/profile/images/${image.id}`}
                >
                    <div className = 'profile-indiv-image'>
                        <img
                            src = { image.imageUrl }
                            alt = 'car'
                            className = 'profile-images'
                        />
                    </div>
                </NavLink>
            )): null}
        </div>
    )
}

export default UserProfile;
