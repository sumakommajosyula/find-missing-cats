/**
 * This router file consists of the API to find missing cats 
 * Author : Suma K
 */
const express = require('express');
const bodyParser = require('body-parser');

const missingCatsRouter = require('./router');

const app = express();
const port = process.env.PORT || 4000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// re-direct to router file
app.use('/api', missingCatsRouter);

// page not found error handler
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

// error handler middleware
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  res.status(error.status || 500).send({
    error: {
      status: error.status || 500,
      message: error.message || 'Internal Server Error',
    },
  });
});

app.listen(port, () => {
  console.log(`App is Listening on port : ${port}`);
});