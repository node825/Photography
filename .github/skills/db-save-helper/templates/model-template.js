const mongoose = require('mongoose');

// Define the schema
const {modelName}Schema = new mongoose.Schema({
  // Add your fields here
  // Example:
  // name: {
  //   type: String,
  //   required: [true, 'Please provide name'],
  //   trim: true
  // },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Add indexes if needed
// Example:
// {modelName}Schema.index({ fieldName: 1 });
// {modelName}Schema.index({ field1: 1, field2: 1 }, { unique: true });

// Add pre-save middleware if needed
// {modelName}Schema.pre('save', function(next) {
//   this.updatedAt = Date.now();
//   next();
// });

// Add virtual properties if needed
// {modelName}Schema.virtual('virtualField').get(function() {
//   return `${this.field1} ${this.field2}`;
// });

// Export the model
module.exports = mongoose.model('{ModelName}', {modelName}Schema);
