const ApiError = require('../utils/ApiError');

const { Tweet } = require('../database/models');
const { User } = require('../database/models');
const { Comments } = require('../database/models');

const CommentSerializer = require('../serializers/CommentSerializer');
const CommentsSerializer = require('../serializers/CommentsSerializer');

const createComment = async (req, res, next) => {
  try {
    const comments = await Comments.create(
      req.body,
    );
    res.json(new CommentSerializer(comments));
  } catch (error) {
    next(error);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comments.destroy({
      where: { id: req.params.id },
    });
    res.json(new CommentSerializer(null));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createComment,
  deleteComment,
};
