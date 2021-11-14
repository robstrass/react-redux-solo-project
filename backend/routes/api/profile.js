const express = require('express');
const asyncHandler = require('express-async-handler');
const { check, validationResult } = require('express-validator');
const { restoreUser } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');

const { Image, Album } = require('../../db/models')

const router = express.Router();

const imageValidation = [
    check('imageUrl')
        .exists({ checkFalsy: true })
        .withMessage('Please provide an image URL.'),
    check('content')
        .exists({ checkFalsy: true })
        .withMessage('Please give a description of your photo.')
]


const albumValidation = [
    check('title')
        .exists({ checkFalsy: true })
        .withMessage('Please give your album a name.'),
]

// All of a User's Images
router.get('/:userId(\\d+)/images', restoreUser, asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const images = await Image.findAll({
        where: {
            userId,
        },
        include: {model: Album}
    })
    res.json(images);
}));

// Get all Albums
router.get('/:userId(\\d+)/albums', asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const albums = await Album.findAll({
        where: {
            userId,
        },
        include: { model: Image }
    });
    res.json(albums);
}));

// Add Image
router.post('/:id(\\d+)/images', imageValidation, asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { userId, albumId, imageUrl, content } = req.body;
    const imageErrors = validationResult(req);

    if (+id === +userId && imageErrors.isEmpty()) {
        const newImg = await Image.build({
            userId,
            albumId,
            imageUrl,
            content
        });
        await newImg.save();
        res.json(newImg);
    } else {
        let errors = imageErrors.array().map((error) => error.msg);
        res.json({ errors });
    }
}));

// Delete Image
router.delete('/:userId(\\d+)/images/:id(\\d+)', asyncHandler(async (req, res) => {
    const { userId, id } = req.params;

    const image = await Image.findByPk(id);
    const imageUserId = image.userId;
    if (+userId === imageUserId) {
        await image.destroy();
        res.json('Success, image deleted.');
    }
}));

// Post album
router.post('/:id(\\d+)/albums', albumValidation, asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { userId, title } = req.body;
    const albumErrors = validationResult(req);

    if (+id === +userId && albumErrors.isEmpty()) {
        const newAlbum = await Album.build({
            userId,
            title
        });
        console.log('newAlbum', newAlbum)
        await newAlbum.save();
        res.json(newAlbum)
    } else {
        let errors = albumErrors.array().map(error => error.msg);
        res.json({ errors });
    }
}));

router.delete('/:userId(\\d+)/albums/:id(\\d+)', asyncHandler(async (req, res) => {
    const { userId, id } = req.params;

    const images = await Image.findAll({
        where: {
            albumId: id
        }
    });

    await images.forEach(image => {
        image.update({
            albumId: null
        });
    });

    const album = await Album.findByPk(id);
    const albumUserId = album.userId;

    if (+userId === albumUserId) {
        await album.destroy();
        res.json('Success, album deleted.')
    }
}));


module.exports = router;
