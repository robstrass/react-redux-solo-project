import { csrfFetch } from "./csrf";

const LOAD_ALBUMS = '/albums/loadAlbums';
const LOAD_ALBUM = 'albums/loadAlbum';
const ADD_ALBUM = '/albums/addAlbum';

const loadAlbums = (albums) => ({
    type: LOAD_ALBUMS,
    albums
});

const loadAlbum = (album) => ({
    type: LOAD_ALBUM,
    album
});

const addAlbum = (album) => ({
    type: ADD_ALBUM,
    album
});

// action creators
export const allAlbums = (userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/profile/${userId}/albums`);

    if (response.ok) {
        const albums = await response.json();
        dispatch(loadAlbums(albums));
        return albums;
    }
}

export const loadOneAlbum = (albumId) => async (dispatch) => {
    const response = await csrfFetch(`/api/albums/${albumId}`)
        .catch(() => {
            dispatch(loadAlbum( {redirect: true} ));
            return {};
        })

        if (response.ok) {
            const album = await response.json();
            dispatch(loadAlbum(album));
            return album;
        }
}

export const addOneAlbum = (album) => async (dispatch) => {
    const { userId } = album;
    const response = await csrfFetch(`/api/profile/${userId}/albums`, {
        method: 'POST',
        body: JSON.stringify(album)
    });

    if (response.ok) {
        const album = await response.json();
        dispatch(addAlbum(album));
        return album;
    }
}

const initialState = { all: {}, current: {} };

const albumsReducer = (state = initialState, action) => {
    let newState = {};
    switch(action.type) {
        case LOAD_ALBUMS:
            newState = { ...state };
            action.albums.forEach(album => {
                newState.current = {};
                newState.all[album.id] = album;
            });
            return newState;
        case LOAD_ALBUM:
            newState = { ...state };
            newState.current = action.album;
            return newState;
        case ADD_ALBUM:
            newState = { ...state };
            newState.all[action.album.id] = action.album;
            return newState;
        default:
            return state;
    }
}

export default albumsReducer;
