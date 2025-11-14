const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');

const {
  getAllSessions, 
  getSessionById,
  createSession, 
  updateSession, 
  deleteSession
    } = require('../controllers/session.controller');


router.use(authMiddleware.verifyJWT);

router.route('/').get(getAllSessions); 
router.route('/:id').get(getSessionById); 
router.route('/create').post(createSession);
router.route('/update/:id').patch(updateSession);
router.route('/delete/:id').delete(deleteSession);

module.exports = router;