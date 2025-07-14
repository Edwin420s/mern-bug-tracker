class APIError extends Error {
  /**
   * Creates a new APIError instance
   * @param {string} message - Error message
   * @param {number} statusCode - HTTP status code (default: 500)
   * @param {string} type - Error type (default: 'API_ERROR')
   * @param {object|null} details - Optional detailed error info
   */
  constructor(message, statusCode = 500, type = 'API_ERROR', details = null) {
    super(message);

    this.statusCode = statusCode;
    this.type = type;
    this.details = details;

    // Capture stack trace for debugging (excluding constructor frame)
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = APIError;
