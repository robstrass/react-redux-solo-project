const express = require('express');
const asyncHandler = require('express-async-handler');

const { Image } = require('../../db/models/image');

const router = express.Router();

// Homepage
router.get('/', asyncHandler(async (req, res) => {
    const images = await Image.findAll()
    res.json(images);
}));

module.exports = router;
