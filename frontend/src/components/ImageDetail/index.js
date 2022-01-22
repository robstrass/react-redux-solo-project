import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Redirect } from 'react-router-dom';

import { loadOneImage } from '../../store/image';
import { getCommentsThunk } from '../../store/comments';
import { addCommentThunk } from '../../store/comments';

import './ImageDetail.css';
import DeleteComment from '../DeleteComment';

function ImageDetail() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const image = useSelector((state) => (state.image.current));
    const comments = useSelector(state => Object.values(state.comments));
    const sessionUser = useSelector(state => state.session.user);

    console.log('laskdnlkansdlasndlad',comments)

    const [actualComment, setActualComment] = useState('');
    const [deleteModal, setDeleteModal] = useState(false);
    const [commentId, setCommentId] = useState('');
    const [commentUserId, setCommentUserId] = useState('');
    const [errors, setErrors] = useState('');

    const validate = () => {
        const validationErrors = [];
        if (!actualComment) validationErrors.push('Comment cannot be empty.');
        if (actualComment.length > 255) validationErrors.push('Comment cannot exceed 255 characters.');

        return validationErrors;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = validate();

        if (errors && errors.length > 0) {
            return setErrors(errors);
        }

        const newComment = {
            userId: sessionUser.id,
            imageId: id,
            comment: actualComment
        }

        await dispatch(addCommentThunk(newComment));
        setActualComment('');
    }

    useEffect(() => (
        dispatch(loadOneImage(id)),
        dispatch(getCommentsThunk(id))
    ), [dispatch, id]);


    if (!sessionUser) return <Redirect to = '/' />;
    if (image.redirect) return <Redirect to = '/homepage' />

    return (
        <>
            {deleteModal && (
                <DeleteComment
                    setDeleteModal={setDeleteModal}
                    commentId={commentId}
                    commentUserId={commentUserId}
                />
            )}
            <div className = 'homepage-single-img-container'>
                <div className = 'homepage-single-div-style'>
                    <div className = 'homepage-single-img-div'>
                        <img
                            className = 'homepage-single-img'
                            src = {image.imageUrl}
                            alt = 'car'
                        />
                    </div>
                    <div className = 'homepage-single-img-content'>
                        {image.content}
                    </div>
                    {comments?.length > 0 && (
                        <div className = 'homepage-single-img-comments-holder'>
                            {comments ? comments.map(comment => (
                                <div
                                    className = 'homepage-single-comment-holder'
                                    key = {comment.id}
                                >
                                    <div className = 'homepage-single-comment-author'>
                                        {comment.User?.username} <span>wrote: </span>
                                    </div>
                                    <div className = 'homepage-single-comment-content'>
                                        {comment.comment}
                                    </div>
                                    {comment.User?.id === sessionUser.id && (
                                        <div className = 'homepage-single-comment-buttons'>
                                            <div className = 'homepage-single-comment-edit'>Edit</div>
                                            <div
                                                className = 'homepage-single-comment-delete'
                                                onClick={() => {
                                                    setDeleteModal(true)
                                                    setCommentId(comment.id)
                                                    setCommentUserId(comment.User.id)
                                                }}
                                            >
                                                Delete
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )) : null}
                        </div>
                    )}
                    <form
                        className='homepage-single-img-form'
                        onSubmit={handleSubmit}
                    >
                        <textarea
                            className='homepage-single-img-textarea'
                            placeholder='Add a comment...'
                            value={actualComment}
                            onChange={(e) => setActualComment(e.target.value)}
                        />
                        <button className='homepage-single-img-submit'>
                            Comment
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ImageDetail;
