import React, { useEffect } from 'react';
import { Redirect, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { allAlbums } from '../../store/albums';

import './AllAlbums.css'

function AllAlbums() {
    const dispatch = useDispatch();
    const albums = useSelector((state) => Object.values(state.albums.all));
    const sessionUser = useSelector(state => state.session.user);

    let userId;
    if (sessionUser) {
        userId = sessionUser.id;
    }

    if (albums[0] && albums[0].Images.length > 0) {
        console.log('here', albums[0].Images[0].imageUrl)
    }

    useEffect(() => {
        dispatch(allAlbums(userId))
    }, [dispatch, userId]);

    if (!sessionUser) return <Redirect to = '/' />;

    return (
        <div className = 'all-albums-container'>
            <h1 className = 'all-albums-header'>Your Albums</h1>
            <div className = 'all-albums-div'>
                { albums.length > 0 ? albums.map(album => (
                    <NavLink
                        className = 'all-albums-nav-wrapper'
                        key = { album.id }
                        to = {`/albums/${album.id}`}
                    >
                        <div className = 'all-albums-style-div'>
                            <div className = 'album-list-img-div'>
                                <img
                                    className = 'all-albums-display'
                                    src = {album.Images.length > 0 ? `${album.Images[0].imageUrl}` : null}
                                />
                            </div>
                            <div className = 'all-albums-field'>{album.title}</div>
                            <div
                                className = 'all-albums-field'
                            >
                                {album.Images.length}
                                {album.Images.length < 2 && album.Images.length > 0
                                    ? <span>Photo</span> : <span>Photos</span>}
                            </div>
                        </div>
                    </NavLink>
                )): null}
            </div>
        </div>
    )
}

export default AllAlbums;
