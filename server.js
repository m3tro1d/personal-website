const express = require('express');
const logger = require('morgan');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const path = require('path');

// Connect to database
require('./app_api/models/db');

// Client-side routers
const indexRouter = require('./app_server/routers/index');
const blogRouter = require('./app_server/routers/blog');
// API routers
const blogApiRouter = require('./app_api/routers/blog');
const rendererApiRouter = require('./app_api/routers/renderer')


const app = express()

// App settings
app.set('port', process.env.PORT);

// Set up view engine
app.set('views', path.join(__dirname, 'app_server/views'));
app.set('view engine', 'pug');

// Middleware
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Client routes
app.use('/', indexRouter);
app.use('/blog', blogRouter);
// API routes
app.use('/api/blog', blogApiRouter);

// Handle 404 error
app.use((req, res, next) => {
  // next(createError(404));
  res.status(404);
  res.render('not_found', {
    title: '404 Not Found',
    page_name: 'Not Found'
  });
});

// Handle errors
app.use((err, req, res, next) => {
  // err.response.status is for axios error objects
  let status = err.status || err.response.status || 500;

  res.locals.message = err.message;
  res.locals.status = status;

  res.status(status);
  res.end(err.message);
});

app.listen(app.get('port'), () => console.log(`Server listening on port ${app.get('port')}.`));
