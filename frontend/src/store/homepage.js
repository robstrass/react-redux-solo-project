import { csrfFetch } from './csrf';

const LOAD_IMAGES = '/homepage/loadImages';

// action creators
export const loadImages = () => async (dispatch) => {
    const response = await csrfFetch('/api/homepage')
}
