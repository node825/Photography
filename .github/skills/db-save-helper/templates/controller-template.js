const {ModelName} = require('../models/{ModelName}');

// @desc    Create new {resource}
// @route   POST /api/{resources}
// @access  Public
const create{ModelName} = async (req, res) => {
  try {
    const { field1, field2, field3 } = req.body;

    // Add custom validation here if needed
    // Example:
    // if (!field1 || field1.length < 3) {
    //   return res.status(400).json({
    //     success: false,
    //     message: 'Field1 must be at least 3 characters'
    //   });
    // }

    const {resourceName} = await {ModelName}.create({
      field1,
      field2,
      field3
    });

    res.status(201).json({
      success: true,
      data: {resourceName}
    });
  } catch (error) {
    // Handle duplicate key error
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({
        success: false,
        message: `A {resource} with this ${field} already exists`
      });
    }

    // Handle validation error
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }

    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all {resources}
// @route   GET /api/{resources}
// @access  Public
const getAll{ModelName}s = async (req, res) => {
  try {
    const {resources} = await {ModelName}.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: {resources}.length,
      data: {resources}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single {resource}
// @route   GET /api/{resources}/:id
// @access  Public
const get{ModelName} = async (req, res) => {
  try {
    const {resourceName} = await {ModelName}.findById(req.params.id);

    if (!{resourceName}) {
      return res.status(404).json({
        success: false,
        message: '{Resource} not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {resourceName}
    });
  } catch (error) {
    // Handle invalid ObjectId
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid {resource} ID'
      });
    }

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update {resource}
// @route   PUT /api/{resources}/:id
// @access  Public
const update{ModelName} = async (req, res) => {
  try {
    const {resourceName} = await {ModelName}.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!{resourceName}) {
      return res.status(404).json({
        success: false,
        message: '{Resource} not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {resourceName}
    });
  } catch (error) {
    // Handle validation error
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }

    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete {resource}
// @route   DELETE /api/{resources}/:id
// @access  Public
const delete{ModelName} = async (req, res) => {
  try {
    const {resourceName} = await {ModelName}.findByIdAndDelete(req.params.id);

    if (!{resourceName}) {
      return res.status(404).json({
        success: false,
        message: '{Resource} not found'
      });
    }

    res.status(200).json({
      success: true,
      message: '{Resource} deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  create{ModelName},
  getAll{ModelName}s,
  get{ModelName},
  update{ModelName},
  delete{ModelName}
};
