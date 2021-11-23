const ApiError = require('../utils/ApiError');

const { Tweet } = require('../database/models');
const { User } = require('../database/models');
const { Comments } = require('../database/models');

const TweetSerializer = require('../serializers/TweetSerializer');
const TweetsSerializer = require('../serializers/TweetsSerializer');

const createTweet = async (req, res, next) => {
  try {
    const tweet = await Tweet.create(
      req.body, {
        include: [{ model: User }],
      },
    );
    res.json(new TweetSerializer(tweet));
  } catch (error) {
    next(error);
  }
};

const getAllTweet = async (req, res, next) => {
  try {
    const tweets = await Tweet.findAll({
      where: { userId: req.user.id },
      include: [{ model: User }, { model: Comments }],
    });
    res.json(new TweetsSerializer(tweets));
  } catch (error) {
    next(error);
  }
};

const getTweet = async (req, res, next) => {
  try {
    const tweet = await Tweet.findOne({
      where: { id: req.params.id },
    });
    res.json(new TweetSerializer(tweet));
  } catch (error) {
    next(error);
  }
};

const deleteTweet = async (req, res, next) => {
  try {
    const tweet = await Tweet.destroy({
      where: { id: req.params.id },
    });
    res.json(new TweetSerializer(null));
  } catch (error) {
    next(error);
  }
};

const getAllTweetsByUsername = async (req, res, next) => {
  try {
    const tweets = await Tweet.findAll({
      where: { userId: req.user.username },
      include: [{ model: User }, { model: Comments }],
    });
    res.json(new TweetsSerializer(tweets));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTweet,
  getAllTweet,
  getTweet,
  deleteTweet,
  getAllTweetsByUsername,
};
