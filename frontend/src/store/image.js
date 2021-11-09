import { csrfFetch } from './csrf';

const LOAD_IMAGES = '/homepage/loadImages';

const load = (images) => ({
    type: LOAD_IMAGES,
    images
});

// action creators
export const loadImages = () => async (dispatch) => {
    const response = await csrfFetch('/api/images');
    const images = await response.json();
    dispatch(load(images));
    return images;
}

const initialState = {};

const imageReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
        case LOAD_IMAGES:
            newState = { ...state };
            action.images.forEach(image => {
                newState[image.id] = image;
            });
            return newState;
        default:
            return state;
    }
};

export default imageReducer;
