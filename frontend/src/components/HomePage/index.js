import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { loadImages } from '../../store/image';

import './HomePage.css';

function HomePage() {
    const dispatch = useDispatch();
    // console.log('state', useSelector(state => console.log(state.images)))
    const images = useSelector((state) => Object.values(state.image));

    console.log('image url', images);

    useEffect(() => {
        dispatch(loadImages())
    },[dispatch])

    const sessionUser = useSelector(state => state.session.user);
    if (!sessionUser) return <Redirect to = '/' />;

    return (
        <>
            {/* {images.map(image => (
                <img key = {image.id} src = {image.imageUrl} alt = {image.content} />
            ))} */}
        </>
    )
}

export default HomePage;
