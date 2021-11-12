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

router.delete('/:userId(\\d+)/images/:id(\\d+)', asyncHandler(async (req, res) => {
    const { userId, id } = req.params;

    const image = await Image.findByPk(id);
    const imageUserId = image.userId;
    if (+userId === imageUserId) {
        await image.destroy();
        res.send(`Deleted image ${id}`);
    }
}));

module.exports = router;
