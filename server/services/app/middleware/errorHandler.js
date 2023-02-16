module.exports = function errorHandler(err, req, res, next) {
  console.log(err);
  let statusCode = 500;
  let message = 'Internal Server Error';

  if (
    err.name === 'SequelizeValidationError' ||
    err.name === 'SequelizeUniqueConstraintError'
  ) {
    statusCode = 400;
    message = err.errors[0].message;
  } else if (
    err.name === 'Email is required' ||
    err.name === 'Password is required'
  ) {
    statusCode = 400;
    message = err.name;
  } else if (err.name === 'Invalid Email/Password') {
    statusCode = 401;
    message = err.name;
  } else if (err.name === 'Invalid Token') {
    statusCode = 401;
    message = err.name;
  } else if (err.name === 'Item not found') {
    statusCode = 404;
    message = err.name;
  } else if (err.name === 'You are not authorized') {
    statusCode = 403;
    message = err.name;
  }

  res.status(statusCode).json({ message });
};
