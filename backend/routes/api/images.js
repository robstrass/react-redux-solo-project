const express = require('express');
const asyncHandler = require('express-async-handler');
const { check, validationResult } = require('express-validator');

const { Image, Album } = require('../../db/models');

const router = express.Router();

const imageNotFoundError = imageId => {
    const err = new Error(`Image number ${imageId} was not found`);
    err.title = 'Image not found';
    err.status = 404;
    throw err;
};

const editValidation = [
    check('content')
        .exists({ checkFalsy: true })
        .withMessage('Please provide Content for your image.')
]

// Get all images
router.get('/', asyncHandler(async (req, res) => {
    const images = await Image.findAll()
    res.json(images);
}));

// Get one image
router.get('/:id(\\d+)', asyncHandler(async (req, res, next) => {
    const imageId = req.params.id;
    const image = await Image.findByPk(imageId, {
        include: { model: Album }
    });
    console.log('image w album', image.Album) 

    if (image) {
        res.json(image);
    } else {
        next(imageNotFoundError(imageId));
    }
}));

// Edit Image
router.put('/:id(\\d+)', editValidation, asyncHandler(async (req, res, next) => {
    const imageId = req.params.id;
    const { userId, albumId, imageUrl, content } = req.body;
    const image = await Image.findByPk(imageId);
    const imageUserId = image.userId;
    const editErrors = validationResult(req);

    if (image && userId === imageUserId && editErrors.isEmpty()) {
        await image.update({
            userId,
            albumId,
            imageUrl,
            content
        });
        res.json(image);
    } else {
        let errors = editErrors.array().map(error => error.msg);
        res.json({ errors });
    }
}));

module.exports = router;
