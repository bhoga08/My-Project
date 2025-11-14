const express = require('express');
const router = express.Router();
const {
  createGoal,
  getGoals,
  updateGoal,
  deleteGoal
} = require('../controllers/goal.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.use(authMiddleware.verifyJWT);

router.get('/', getGoals);
router.post('/create', createGoal);
router.put('/update/:id', updateGoal);
router.delete('/delete/:id', deleteGoal);

module.exports = router;