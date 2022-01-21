import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Redirect } from 'react-router-dom';

import { loadOneImage } from '../../store/image';

import './ImageDetail.css';

function ImageDetail() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const image = useSelector((state) => (state.image.current));
    console.log('imageeeeeee', image)

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    useEffect(() => (
        dispatch(loadOneImage(id))
    ), [dispatch, id]);

    const sessionUser = useSelector(state => state.session.user);
    if (!sessionUser) return <Redirect to = '/' />;

    if (image.redirect) return <Redirect to = '/homepage' />

    return (
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
                {image.Comments?.length > 0 && (
                    <div className = 'homepage-single-img-comments-holder'>
                        {image.Comments ? image.Comments.map(comment => (
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
                                        <div className = 'homepage-single-comment-delete'>Delete</div>
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
                    />
                    <button className='homepage-single-img-submit'>
                        Comment
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ImageDetail;
