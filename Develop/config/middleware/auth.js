const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { User } = require('../../models');

const sessionConfig = {
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: require('../../models').sequelize,
  }),
};

const authenticateUser = (req, res, next) => {
  if (req.session.user) {
    return next();
  } else {
    return res.redirect('/login');
  }
};

module.exports = { sessionConfig, authenticateUser };
