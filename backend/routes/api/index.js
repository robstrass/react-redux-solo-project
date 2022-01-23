const express = require('express');
const asyncHandler = require('express-async-handler');

// const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth.js');
// const { User } = require('../../db/models');

const router = express.Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const imageRouter = require('./images.js');
const profileRouter = require('./profile.js');
const albumRouter = require('./albums');
const commentRouter = require('./comments.js');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/images', imageRouter);
router.use('/profile', profileRouter);
router.use('/albums', albumRouter);
router.use('/comments', commentRouter);

// // tests 'token' cookie
// router.get('/set-token-cookie', asyncHandler(async (req, res) => {
//     const user = await User.findOne({
//         where: {
//             username: 'Demo-User'
//         },
//     });
//     setTokenCookie(res, user);
//     return res.json({ user });
// }));

// // tests restoreUser by bringing up Demo-User's info
// router.get('/restore-user', restoreUser, (req, res) => {
//     return res.json(req.user);
// });

// // tests requireAuth, if no session, it will return an error
// router.get('/require-auth', requireAuth, (req, res) => {
//     return res.json(req.user);
// });

// Post route testing the API route
router.post('/test', (req, res) => {
    res.json({
        requestBody: req.body
    })
});

module.exports = router;
