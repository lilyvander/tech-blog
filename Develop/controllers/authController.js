const { User } = require('../models');
const bcrypt = require('bcrypt');

// Create a new user
exports.registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      password: hashedPassword,
    });

    req.session.user = {
      id: newUser.id,
      username: newUser.username,
    };

    res.status(200).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to register new user' });
  }
};

// Existing user login
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({
      where: { username },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    req.session.user = {
      id: user.id,
      username: user.username,
    };

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to log in' });
  }
};

// User logout 
exports.logoutUser = (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: 'Failed to log out' });
      }
      res.status(204).end();
    });
  };