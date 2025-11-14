const express = require('express');
const { registerUser, loginUser, logoutUser, refreshAccessToken, changeCurrentPassword, getCurrentUser } = require('../controllers/user.controller');
const { verifyJWT } = require('../middlewares/auth.middleware');

const router = express.Router();


router.post('/register', registerUser);


router.post('/login', loginUser);


router.post('/logout', verifyJWT, logoutUser);
router.post('/refresh-token', refreshAccessToken);
router.post('/change-password', verifyJWT, changeCurrentPassword);
router.get('/current-user', verifyJWT, getCurrentUser);

module.exports = router;
