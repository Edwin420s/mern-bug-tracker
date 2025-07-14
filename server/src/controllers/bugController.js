const Bug = require('../models/Bug');
const APIError = require('../utils/APIError');

// @desc    Get all bugs
// @route   GET /api/bugs
// @access  Public
exports.getBugs = async (req, res, next) => {
  try {
    const bugs = await Bug.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: bugs });
  } catch (err) {
    next(err);
  }
};

// @desc    Get a single bug
// @route   GET /api/bugs/:id
// @access  Public
exports.getBug = async (req, res, next) => {
  try {
    const bug = await Bug.findById(req.params.id);
    if (!bug) throw new APIError('Bug not found', 404);

    res.status(200).json({ success: true, data: bug });
  } catch (err) {
    next(err);
  }
};

// @desc    Create a new bug
// @route   POST /api/bugs
// @access  Public
exports.createBug = async (req, res, next) => {
  try {
    const bug = await Bug.create(req.body);
    res.status(201).json({ success: true, data: bug });
  } catch (err) {
    next(err);
  }
};

// @desc    Update a bug
// @route   PUT /api/bugs/:id
// @access  Public
exports.updateBug = async (req, res, next) => {
  try {
    const bug = await Bug.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!bug) throw new APIError('Bug not found', 404);

    res.status(200).json({ success: true, data: bug });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete a bug
// @route   DELETE /api/bugs/:id
// @access  Public
exports.deleteBug = async (req, res, next) => {
  try {
    const bug = await Bug.findByIdAndDelete(req.params.id);

    if (!bug) throw new APIError('Bug not found', 404);

    res.status(200).json({ success: true, message: 'Bug deleted successfully' });
  } catch (err) {
    next(err);
  }
};
