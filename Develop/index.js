const express = require('express');
const session = require('express-session');
const { sessionConfig } = require('./config/middleware/auth');
const routes = require('./controllers');

const app = express();
const PORT = 3001;

app.use(session(sessionConfig));

app.use(routes);

app.listen(PORT, () => {
    console.log(`App is listening at http://localhost:${PORT}`);
});