import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { loadOneImage } from '../../store/image';

function ImageDetail() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const images = useSelector((state) => (state.image.current))
    console.log('images, ', images)

    useEffect(() => (
        dispatch(loadOneImage(id))
    ), [dispatch]);

    return (
            <>
                <h2>Youre here</h2>
                <div className = 'homepage-single-img-div'>
                    {/* {images.length > 0 ? */}
                        {/* <img
                            src = {images[id].imageUrl}
                            alt = 'pic'
                            className = 'homepage-single-img'
                        /> */}
                    {/* : null} */}
                </div>
            </>
    )
}

export default ImageDetail;
