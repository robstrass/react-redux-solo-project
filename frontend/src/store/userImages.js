import { csrfFetch } from "./csrf";

const LOAD_IMAGES = '/profile/loadImages';
const LOAD_IMAGE = '/profile/loadOneImage';
const ADD_IMAGE = '/profile/addImage';
const REMOVE_IMAGE = '/profile/removeImage';
const EDIT_IMAGE = '/profile/editImage';

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

const removeImage = (image) => ({
    type: REMOVE_IMAGE,
    image
});

const editImage = (image) => ({
    type: EDIT_IMAGE,
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
    const response = await csrfFetch(`/api/images/${imageId}`)
        .catch(() => {
            dispatch(loadOne({redirect: true}));
            return {};
        })

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

export const deleteImage = (image) => async (dispatch) => {
    const { userId, id } = image;
    const response = await csrfFetch(`/api/profile/${userId}/images/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        dispatch(removeImage(image));
        return image;
    }
}

export const editOneImage = (image) => async (dispatch) => {
    const { id } = image;
    console.log('id', image)
    const response = await csrfFetch(`/api/images/${id}`, {
        method: 'PUT',
        body: JSON.stringify(image)
    });

    if (response.ok) {
        const image = await response.json();
        dispatch(editImage(image));
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
            newState.all[action.image.id] = action.image;
            return newState;
        case REMOVE_IMAGE:
            newState = { ...state };
            delete newState[action.image];
            delete newState.all[action.image.id]
            // newState.switch = !newState.switch
            return newState;
        case EDIT_IMAGE:
            newState = { ...state };
            newState.all[action.image.id] = action.image;
            return newState;
        default:
            return state;
    }
};

export default userImageReducer;
