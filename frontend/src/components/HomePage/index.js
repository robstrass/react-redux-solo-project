import React from 'react';
import { useSelector } from 'react-redux';

import './HomePage.css';

function HomePage() {
    const sessionUser = useSelector(state => state.session.user);
    console.log('sessionUser', sessionUser)
    if (sessionUser) {(
        <>
            <div>Hello</div>
        </>
    )}

    return (
        <>
            <p>Hi</p>
        </>
    )
}

export default HomePage;
