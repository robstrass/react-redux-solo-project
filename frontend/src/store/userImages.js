import { csrfFetch } from "./csrf";

const LOAD_IMAGES = '/profile/loadImages';

const loadAll = (images) => ({
    type: LOAD_IMAGES,
    images
});

// action creators
export const loadImages = (userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/profile/${userId}/images`);

    if (response.ok) {
        const images = await response.json();
        dispatch(loadAll(images));
        return images;
    }
}

const initialState = { all: {}, current: {} };

const userImageReducer = (state = initialState, action) => {
    let newState = {};
    switch(action.type) {
        case LOAD_IMAGES:
        newState = { ...state };
            action.images.forEach(image => {
                newState.current = {};
                newState.all[image.id] = image;
            });
            return newState;
        default:
            return state;
    }
};

export default userImageReducer;
