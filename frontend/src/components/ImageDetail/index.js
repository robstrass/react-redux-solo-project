import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { loadImages } from '../../store/image';

function ImageDetail() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const images = useSelector((state) => (state.image))
    console.log('images, ', images[id])

    useEffect(() => (
        dispatch(loadImages())
    ), [dispatch]);

    return (
        <>
            <h2>Youre here</h2>
            <img src = {images[id].imageUrl} alt = 'pic'/>
        </>
    )
}

export default ImageDetail;
