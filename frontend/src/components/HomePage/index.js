import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './HomePage.css';

function HomePage() {
    const sessionUser = useSelector(state => state.session.user);
    console.log('sessionUser', sessionUser)
    if (!sessionUser) return <Redirect to = '/' />;

    return (
        <>
            <p>Hi</p>
        </>
    )
}

export default HomePage;
