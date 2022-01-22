import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './EditComment.css';

export default function EditComment({ setEditModal, editingComment }) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    console.log('edit id', editingComment.id)

    const [actualComment, setActualComment] = useState(editingComment.comment);
    const [errors, setErrors] = useState('');

    const validate = () => {
        const validationErrors = [];

        if (!actualComment) validationErrors.push('Edit cannot be empty.');
        if (actualComment.length > 255) validationErrors.push('Comment cannot exceed 255 characters.');

        return validationErrors;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const errors = validate();

        if (errors && errors.length > 0) {
            return setErrors(errors);
        }

        const editedComment = {
            comment: actualComment,
            commentId: editingComment.id
        }
    }

    return (
        <>
            <div
                className='edit-comment-background'
                onClick={() => setEditModal(false)}
            ></div>
            <div className='edit-comment-container'>
                {errors.length > 0 && (<div className = 'new-image-errors-div'>
                    <ul className = 'new-image-errors-ul'>
                        { errors.map(error => (
                            <li
                                className = 'new-image-error-li'
                                key = { error }
                            >
                                { error }
                            </li>
                        ))}
                    </ul>
                </div>)}
                <form
                    className='edit-comment-form'
                    onSubmit={handleSubmit}
                >
                    <textarea
                        className='edit-comment-textarea'
                        value={actualComment}
                        onChange={(e) => setActualComment(e.target.value)}
                    />
                    <button className='edit-comment-submit'>
                        Edit
                    </button>
                </form>
            </div>
        </>
    )
}
