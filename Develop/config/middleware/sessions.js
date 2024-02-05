const session = require('express-session');
const SequelizeStore = require('connect-session-sequlize')(session.Store);
const { sequelize } = require('../../models');

const sessionConfig = {
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, 
    secure: process.env.NODE_ENV === 'production', 
    httpOnly: true, 
  },
  store: new SequelizeStore({
    db: sequelize,
  }),
    
};

const initSession = session(sessionConfig);

module.exports = initSession;