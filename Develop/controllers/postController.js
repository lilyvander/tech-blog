const { Post } = require('../models');

const postController = {
  getAllPosts: async (req, res) => {
    try {
      const posts = await Post.findAll();
      res.render('home', { posts });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getOnePost: async (req, res) => {
    try {
      const post = await Post.findByPk(req.params.id);
      if (!post) {
        res.status(404).json({ message: 'Post not found' });
        return;
      }
      res.render('post', { post });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  createPost: async (req, res) => {
    try {
      const newPost = await Post.create({
        title: req.body.title,
        content: req.body.content,
        // Assuming userId is associated with the current user
        userId: req.session.user.id,
      });

      res.redirect('/dashboard'); // Redirect to the user's dashboard after creating a post
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Bad Request' });
    }
  },

  updatePost: async (req, res) => {
    try {
      const updatedPost = await Post.update(
        {
          title: req.body.title,
          content: req.body.content,
        },
        {
          where: {
            id: req.params.id,
            userId: req.session.user.id, // Make sure to update only the user's own posts
          },
        }
      );

      if (updatedPost[0] === 0) {
        res.status(404).json({ message: 'Post not found' });
        return;
      }

      res.redirect('/dashboard'); // Redirect to the user's dashboard after updating a post
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Bad Request' });
    }
  },

  deletePost: async (req, res) => {
    try {
      const deletedPost = await Post.destroy({
        where: {
          id: req.params.id,
          userId: req.session.user.id, // Make sure to delete only the user's own posts
        },
      });

      if (deletedPost === 0) {
        res.status(404).json({ message: 'Post not found' });
        return;
      }

      res.redirect('/dashboard'); // Redirect to the user's dashboard after deleting a post
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = postController;
