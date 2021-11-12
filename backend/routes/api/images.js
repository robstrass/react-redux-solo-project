const express = require('express');
const asyncHandler = require('express-async-handler');

const { Image } = require('../../db/models');

const router = express.Router();

const imageNotFoundError = productId => {
    const err = new Error(`Product number ${productId} was not found`);
    err.title = 'Product not found';
    err.status = 404;
    throw err;
};

// Get all images
router.get('/', asyncHandler(async (req, res) => {
    const images = await Image.findAll()
    res.json(images);
}));

// Get one image
router.get('/:id(\\d+)', asyncHandler(async (req, res, next) => {
    const imageId = req.params.id;
    const image = await Image.findByPk(imageId);
    console.log('back img', image)
    if (image) {
        res.json(image);
    } else {
        next(imageNotFoundError(imageId));
    }
}));

// Edit Image
router.put('/:id(\\d+)', asyncHandler(async (req, res, next) => {
    const imageId = req.params.id;
    const { userId, albumId, imageUrl, content } = req.body;
    const image = await Image.findByPk(imageId);
    const imageUserId = image.userId;
    console.log('image', userId, imageUserId)
    if (image && userId === imageUserId) {
        await image.update({
            userId,
            albumId,
            imageUrl,
            content
        });
        res.json(image);
    } else {
        next(imageNotFoundError(imageId))
    }
}));

module.exports = router;
