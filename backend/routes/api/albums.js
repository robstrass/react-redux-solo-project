const express = require('express');
const asyncHandler = require('express-async-handler');
const { check, validationResult } = require('express-validator');

const { Album, Image } = require('../../db/models');

const router = express.Router();

const albumNotFoundError = albumId => {
    const err = new Error(`Album number ${albumId} was not found`);
    err.title = 'Album not found';
    err.status = 404;
    throw err;
};

// Get single album
router.get('/:id(\\d+)', asyncHandler(async (req, res, next) => {
    const albumId = req.params.id;
    const album = await Album.findByPk(albumId, {
        include: {
            model: Image
        }
    });

    if (album) {
        res.json(album)
    } else {
        next(albumNotFoundError(albumId))
    }
}));

module.exports = router;
