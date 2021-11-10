import React, { useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { loadImages } from '../../store/userImages';

import './UserProfile.css';

function UserProfile() {
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session.user);
    if (!sessionUser) return <Redirect to = '/' />;

    return (
        <div>Hello</div>
    )
}

export default UserProfile;
