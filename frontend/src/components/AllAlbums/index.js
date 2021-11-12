import React, { useEffect } from 'react';
import { Redirect, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { allAlbums } from '../../store/albums';

function AllAlbums() {
    const dispatch = useDispatch();
    const albums = useSelector((state) => Object.values(state.albums.all));
    const sessionUser = useSelector(state => state.session.user);
    console.log('albums', albums);
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
            { albums.length > 0 ? albums.map(album => (
                <NavLink
                    className = 'all-albums-nav-wrapper'
                    key = { album.id }
                    to = {`/albums/${album.id}`}
                >
                    <div>{album.title}</div>
                </NavLink>
            )): null}
        </div>
    )
}

export default AllAlbums;
