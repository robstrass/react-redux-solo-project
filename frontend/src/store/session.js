import { csrfFetch } from "./csrf";

const SET_USER = '/session/setUser';
const REMOVE_USER = '/session/removeUser';

// action creators
export const setUser = (user) => ({
    type: SET_USER,
    user
});

export const removeUser = () => ({
    return: REMOVE_USER,
});

// action thunk
export const login = (user) => async (dispatch) => {
    const { credential, password } = user;
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            credential,
            password
        }),
    });
    const data = await response.json();
    dispatch(setUser(data.user))
    return response;
}

export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
}

// reducer
const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
        case SET_USER:
            newState = { ...state };
            newState.user = action.user;
            return newState;
        case REMOVE_USER:
            newState = { ...state };
            newState.user = null;
            return newState;
        default:
            return state;
    }
};

export default sessionReducer;
