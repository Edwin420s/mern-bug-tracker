const debugLogger = (req, res, next) => {
  console.log('\n=== Incoming Request ===');
  console.log(`Method: ${req.method}`);
  console.log(`Path: ${req.path}`);
  console.log('Headers:', req.headers);
  console.log('Query:', req.query);
  console.log('Body:', req.body);
  console.log('========================\n');
  next();
};

module.exports = debugLogger;