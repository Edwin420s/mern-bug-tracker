const debugLogger = (req, res, next) => {
  console.log('\n=== Request Debug Information ===');
  console.log(`Timestamp: ${new Date().toISOString()}`);
  console.log(`Method: ${req.method}`);
  console.log(`Path: ${req.path}`);
  
  if (Object.keys(req.query).length > 0) {
    console.log('Query Parameters:', req.query);
  }
  
  if (Object.keys(req.body).length > 0) {
    console.log('Request Body:', req.body);
  }
  
  console.log('Headers:', {
    'content-type': req.get('content-type'),
    accept: req.get('accept'),
    'user-agent': req.get('user-agent')
  });
  
  console.log('================================\n');
  next();
};

module.exports = debugLogger;