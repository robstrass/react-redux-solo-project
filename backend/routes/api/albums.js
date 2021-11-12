const express = require('express');
const asyncHandler = require('express-async-handler');
const { check, validationResult } = require('express-validator');

const { Album, Image } = require('../../db/models');

const router = express.Router();

// Get single album
router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
    const albumId = req.params.id;
    const album = await Album.findByPk(albumId, {
        include: {
            model: Image
        }
    });

    if (album) {
        res.json(album)
    } else {
        res.send('Album not found')
    }
}));

module.exports = router;
