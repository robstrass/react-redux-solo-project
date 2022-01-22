const express = require('express');
const asyncHandler = require('express-async-handler');

const { Image, Comment } = require('../../db/models');

const router = express.Router();

// Delete Comment
router.delete('/id(\\d+)', asyncHandler(async (req, res, next) => {
    const { commentId } = req.params.id;

    const comment = await Comment.findByPk(commentId);
    await comment.destroy();
    res.json('Success, comment deleted.');
}));



module.exports = router;
