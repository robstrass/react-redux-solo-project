import { csrfFetch } from './csrf';

const ADD_COMMENT = '/comment/ADD_COMMENT';

// Action Creators
const addComment = (comment) => ({
    type: ADD_COMMENT,
    comment
});

// Thunks
export const addCommentThunk = (comment) => async (dispatch) => {
    const { imageId } = comment;
    const response = await csrfFetch(`/api/images/${imageId}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment),
    });

    if (response.ok) {
        const data = await response.json()
        dispatch(addComment(data));
        return data;
    }
}

// Reducah
const commentsReducer = (state = {}, action) => {
    const newState = {};
    switch(action.type) {
        case ADD_COMMENT:
            newState = { ...state };
            newState[action.comment.id] = action.comment;
            return newState;
        default:
            return state;
    }
};

export default commentsReducer;
