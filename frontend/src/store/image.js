import { csrfFetch } from './csrf';

const LOAD_IMAGES = '/homepage/loadImages';
const LOAD_IMAGE = '/homepage/loadOneImage';

const loadAll = (images) => ({
    type: LOAD_IMAGES,
    images
});

const loadOne = (image) => ({
    type: LOAD_IMAGE,
    image
});

// action creators
export const loadImages = () => async (dispatch) => {
    const response = await csrfFetch('/api/images');
    const images = await response.json();
    dispatch(loadAll(images));
    return images;
}

export const loadOneImage = (imageId) => async (dispatch) => {
    const response = await csrfFetch(`/api/images/${imageId}`);

    if (response.ok) {
        const image = await response.json();
        dispatch(loadOne(image))
        return image;
    }
}

const initialState = { all: {}, current: {} };

const imageReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
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
        default:
            return state;
    }
};

export default imageReducer;
