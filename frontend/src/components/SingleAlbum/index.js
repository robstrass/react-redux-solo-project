import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Redirect, NavLink } from 'react-router-dom';

import { loadOneAlbum } from '../../store/albums';

import './SingleAlbum.css';

function SingleAlbum() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const album = useSelector(state => (state.albums.current));
    console.log('album', album)
    useEffect(() => (
        dispatch(loadOneAlbum(id))
    ), [dispatch, id]);

    const sessionUser = useSelector(state => state.session.user);
    if (!sessionUser) return <Redirect to = '/' />;

    if (album.redirect) return <Redirect to = '/albums' />

    return (
        <>
            <div className = 'single-album-title-div'>
                <h1 className = 'single-album-title'>
                    { album.title }
                </h1>
                <button className = 'single-album-delete'>
                    Remove Album
                </button>
            </div>
            <div className = 'single-album-container'>
                { album.Images?.length > 0 ? album.Images.map(image => (
                    <NavLink
                        key = { image.id }
                        className = 'single-album-img-nav'
                        to = { `/profile/images/${image.id}` }
                    >
                        <div className = 'single-album-img-div'>
                            <img
                                className = 'single-album-img'
                                src = { image.imageUrl }
                                alt = 'car'
                            />
                        </div>
                        {/* <div>hi</div> */}
                    </NavLink>
                )) : null }
            </div>
        </>
    )
}

export default SingleAlbum;
