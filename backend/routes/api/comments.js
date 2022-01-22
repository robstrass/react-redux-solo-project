const express = require('express');
const asyncHandler = require('express-async-handler');
const { validationResult, check } = require('express-validator');

const { Image, Comment, User } = require('../../db/models');

const router = express.Router();

const editCommentValidation = [
    check('comment')
        .exists({ checkFalsy: true })
        .withMessage('Comment cannot be blank')
        .isLength({ max: 255 })
        .withMessage('Comment needs to be less than 255 characters')
];

// Delete Comment
router.delete('/:id(\\d+)', asyncHandler(async (req, res, next) => {
    const commentId = req.params.id;
    const comment = await Comment.findByPk(commentId);
    await comment.destroy();
    res.json('Success, comment deleted.');
}));

// Edit Comment
router.put('/:id(\\d+)', editCommentValidation, asyncHandler(async (req, res, next) => {
    const commentId = req.params.id;
    const { userId, comment } = req.body;
    const editComment = await Comment.findByPk(commentId);
    const editErrors = validationResult(req);

    if (editErrors.isEmpty() && userId === editComment.userId) {
        await editComment.update({
            comment
        });
        const newComment = await Comment.findByPk(editComment.id, { include: User })
        res.json(newComment);
    } else {
        let errors = editErrors.array().map(error => error.msg);
        res.json({ errors });
    }
}));

module.exports = router;
