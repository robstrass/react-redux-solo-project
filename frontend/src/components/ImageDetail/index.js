import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { loadOneImage } from '../../store/image';

import './ImageDetail.css';

function ImageDetail() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const image = useSelector((state) => (state.image.current))
    console.log('image, ', image)

    useEffect(() => (
        dispatch(loadOneImage(id))
    ), [dispatch]);

    return (
        <div className = 'homepage-single-img-container'>
            {/* <h2>Youre here</h2> */}
            <div className = 'homepage-single-div-style'>
                <div className = 'homepage-single-img-div'>
                    <img
                        className = 'homepage-single-img'
                        src = {image.imageUrl}
                        alt = 'car photo'
                    />
                </div>
                <div className = 'homepage-single-img-content'> Author says: {image.content}</div>
            </div>
        </div>
    )
}

export default ImageDetail;
