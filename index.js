require('dotenv').config();

const express = require('express');

const app = express();

const apiRouter = require('./app/router');

const port = process.env.PORT || 5461;

app.use('/v1', apiRouter);

app.listen(port, () => console.log(`Server running on port ${process.env.PORT}`));