import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './DeleteComment.css';
import { deleteCommentThunk } from '../../store/comments';

export default function DeleteComment({ setDeleteModal, commentId, commentUserId }) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    const handleSubmit = async (e) => {
        if (user.id === commentUserId) {
            console.log('hello')
            await dispatch(deleteCommentThunk(commentId));
            setDeleteModal(false);
        }
    }

    return (
        <>
            <div
                className='delete-comment-background'
                onClick={() => setDeleteModal(false)}
            ></div>
            <div className='delete-comment-container'>
                <h3 className='delete-comment-title'>
                    Permanently Delete?
                </h3>
                <div className='delete-comment-buttons'>
                    <div
                        className='delete-comment-confirm'
                        onClick={handleSubmit}
                    >
                        Confirm
                    </div>
                    <div
                        className='delete-comment-cancel'
                        onClick={() => setDeleteModal(false)}
                    >
                        Cancel
                    </div>
                </div>
            </div>
        </>
    )
}
