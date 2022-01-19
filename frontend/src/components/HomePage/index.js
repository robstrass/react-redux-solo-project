import React, { useEffect } from 'react';
import { Redirect, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { loadImages } from '../../store/image';

import './HomePage.css';

function HomePage() {
    const dispatch = useDispatch();
    const images = useSelector((state) => Object.values(state.image.all));

    useEffect(() => {
        dispatch(loadImages())
    },[dispatch]);

    const sessionUser = useSelector(state => state.session.user);
    if (!sessionUser) return <Redirect to = '/' />;

    return (
        <>
            <div className = 'homepage-headline-div'>
                <h1 className = 'homepage-headline'>
                    Explore
                </h1>
            </div>
            <div className = 'homepage-all-images'>
                {images.length > 0 ? images.map(image => (
                    <NavLink
                        className = 'homepage-nav-wrapper'
                        key = {image.id}
                        to = {`/homepage/images/${image.id}`}
                        onClick = {() => console.log('hit redirect')}
                    >
                        <div className = 'homepage-indiv-image'>
                            <img
                                src = {image.imageUrl}
                                alt = 'car'
                                className = 'homepage-images'
                            />
                        </div>
                        <div
                            className = 'homepage-image-content'
                        >
                            {image.content}
                        </div>
                    </NavLink>
                )) : null}
            </div>
        </>
    )
}

export default HomePage;
