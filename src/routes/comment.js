const express = require('express');

const router = express.Router();
const { authMiddleware } = require('../middlewares/authMiddleware');

const {
  deleteComment,
} = require('../controllers/comments');

router.delete('/:id', authMiddleware, deleteComment);

module.exports = router;
