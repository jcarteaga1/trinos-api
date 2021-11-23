const express = require('express');

const router = express.Router();
const { authMiddleware } = require('../middlewares/authMiddleware');

const {
  createTweet, getAllTweet, getTweet, deleteTweet, getAllTweetsByUsername,
} = require('../controllers/tweet');

const {
  createComment,
} = require('../controllers/comments');

router.post('/', authMiddleware, createTweet);
router.get('/', authMiddleware, getAllTweet);
router.get('/:id', getTweet);
router.post('/:id/comments', createComment);
router.delete('/:id', authMiddleware, deleteTweet);
router.get('/feed/:username', getAllTweetsByUsername);

module.exports = router;
