import React, { useEffect } from 'react';
import { Redirect, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { allAlbums } from '../../store/albums';

function AllAlbums() {
    const dispatch = useDispatch();
    const albums = useSelector((state) => Object.values(state.albums.all));
    const sessionUser = useSelector(state => state.session.user);

    let userId;
    if (sessionUser) {
        userId = sessionUser.id;
    }

    useEffect(() => {
        dispatch(allAlbums(userId))
    }, [dispatch, userId]);

    if (!sessionUser) return <Redirect to = '/' />;

    return (
        <div className = 'all-albums-container'>
            <h1 className = 'all-albums-header'>Your Albums</h1>
            { albums.length > 0 ? albums.map(album => (
                <NavLink
                    className = 'all-albums-nav-wrapper'
                    key = { album.id }
                    to = {`/albums/${album.id}`}
                    // styles = { album.Image > 0 ? {backgroundImage: `url(${album.Image[0].imageUrl})`} : null }
                >
                    <div className = 'all-albums-field'>{album.title}</div>
                    <div className = 'all-albums-field'>{album.Images.length} {album.Images.length < 2 ? <span>Photo</span> : <span>Photos</span>}</div>
                </NavLink>
            )): null}
        </div>
    )
}

export default AllAlbums;
