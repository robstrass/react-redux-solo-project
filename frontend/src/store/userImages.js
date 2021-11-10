import { csrfFetch } from "./csrf";

const LOAD_IMAGES = '/profile/loadImages';
const LOAD_IMAGE = '/profile/loadOneImage';
const ADD_IMAGE = '/profile/addImage';

const loadAll = (images) => ({
    type: LOAD_IMAGES,
    images
});

const loadOne = (image) => ({
    type: LOAD_IMAGE,
    image
});

const addImage = (image) => ({
    type: ADD_IMAGE,
    image
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

export const loadOneImage = (imageId) => async (dispatch) => {
    const response = await csrfFetch(`/api/images/${imageId}`);

    if (response.ok) {
        const image = await response.json();
        dispatch(loadOne(image))
        return image;
    }
}

export const addOneImage = (image) => async (dispatch) => {
    const { userId } = image;
    const response = await csrfFetch(`/api/profile/${userId}/images`, {
        method: 'POST',
        body: JSON.stringify(image)
    });

    if (response.ok) {
        const image = await response.json();
        dispatch(addImage(image));
        return image;
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
        case LOAD_IMAGE:
            newState = { ...state };
            newState.current = action.image;
            return newState;
        case ADD_IMAGE:
            newState = { ...state };
            newState[action.image.id] = action.image;
            return newState;
        default:
            return state;
    }
};

export default userImageReducer;
