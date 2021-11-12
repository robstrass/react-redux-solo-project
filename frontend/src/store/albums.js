import { csrfFetch } from "./csrf";

const LOAD_ALBUMS = '/albums/loadAlbums';

const loadAlbums = (albums) => ({
    type: LOAD_ALBUMS,
    albums
})

// action creators
export const allAlbums = (userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/profile/${userId}/albums`);

    if (response.ok) {
        const albums = await response.json();
        dispatch(loadAlbums(albums));
        return albums;
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
        default:
            return state;
    }
}

export default albumsReducer;
