const { NODE_ENV } = process.env;

const errorHandler = (err, req, res, next) => {
  // 1. Log the error
  console.error('\n⏰ [', new Date().toISOString(), ']');
  console.error('🚨 Error in:', req.method, req.originalUrl);
  console.error('📌 Message:', err.message);
  if (NODE_ENV === 'development') {
    console.error('🔍 Stack Trace:', err.stack);
  }

  // 2. Default response
  let statusCode = err.statusCode || err.status || 500;
  let message = err.message || 'Internal Server Error';
  let errors = null;

  // 3. Handle specific error types
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation Error';
    errors = {};
    Object.keys(err.errors).forEach((key) => {
      errors[key] = err.errors[key].message;
    });
  }

  if (err.code === 11000) {
    statusCode = 409;
    message = 'Duplicate field value';
    errors = {
      [Object.keys(err.keyPattern)[0]]: 'This value already exists',
    };
  }

  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token';
  }

  if (err.type === 'API_ERROR') {
    statusCode = err.statusCode || 400;
    message = err.message;
    if (err.details) errors = err.details;
  }

  // 4. Final response
  res.status(statusCode).json({
    success: false,
    message,
    ...(errors && { errors }),
    ...(NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = errorHandler;
