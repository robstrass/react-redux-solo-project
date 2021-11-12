import React, { useEffect } from 'react';
import { Redirect, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { allAlbums } from '../../store/albums';

function AllAlbums() {
    const dispatch = useDispatch();

    return (
        <h2>hi bitch</h2>
    )
}

export default AllAlbums;
