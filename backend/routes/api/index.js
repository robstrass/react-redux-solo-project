const express = require('express');

const router = express.Router();

// Post route testing the API route
router.post('/test', (req, res) => {
    res.json({
        requestBody: req.body
    })
});

module.exports = router;
