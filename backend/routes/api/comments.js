const express = require('express');
const asyncHandler = require('express-async-handler');
const { validationResult } = require('express-validator');

const { Image, Comment } = require('../../db/models');

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
    const editComment = Comment.findByPk(commentId);
    const editErrors = validationResult(req);

    if (editErrors.isEmpty() && userId === editComment.userId) {
        await editComment.update({
            comment
        });
        res.json(editComment);
    } else {
        let errors = editErrors.array().map(error => error.msg);
        res.json({ errors });
    }
}));

module.exports = router;
