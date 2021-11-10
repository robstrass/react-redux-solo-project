const express = require('express');
const asyncHandler = require('express-async-handler');
const { restoreUser } = require('../../utils/auth');

const { User, Image, Album } = require('../../db/models')

const router = express.Router();

// All of a User's Images
router.get('/:userId(\\d+)/images', restoreUser, asyncHandler(async (req, res) => {
    const { userId } = req.params;
    console.log('userId, ', userId)
    const images = await Image.findAll({
        where: {
            userId,
        }
    })
    res.json(images);
}));

module.exports = router;
