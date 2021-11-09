import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { loadOneImage } from '../../store/image';

function ImageDetail() {
    const dispatch = useDispatch();
    const { imageId } = useParams();
    const images = useSelector((state) => Object.values(state.image))
    const image = images.find(image => imageId === image.id);

    console.log('image', image);

    return (
        <h2>Youre here</h2>
    )
}

export default ImageDetail;
