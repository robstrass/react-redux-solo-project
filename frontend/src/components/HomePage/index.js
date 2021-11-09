import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { loadImages } from '../../store/image';

import './HomePage.css';

function HomePage() {
    const dispatch = useDispatch();
    // console.log('state', useSelector(state => console.log(state.images)))
    const images = useSelector((state) => Object.values(state.image));
    // const [isLoaded, setIsLoaded] = useState(false);

    console.log('image url', images);

    useEffect(() => {
        dispatch(loadImages())
    },[dispatch]);

    const sessionUser = useSelector(state => state.session.user);
    if (!sessionUser) return <Redirect to = '/' />;

    return (
        <div>
            {images.length > 0 ? images.map(image => (
                <img key = {image.id} src = {image.imageUrl} alt = 'car' />
            )) : null}
        </div>
    )

    return null;
}

export default HomePage;
