const mongoose = require('mongoose');

// Define the schema for the data
const dataSchema = new mongoose.Schema({
  checkboxValue: Boolean,
  radioButtonValue: String,
  selectedOption: String,
  files: [String],
});
// Create another model using the same schema
const NecessaryDataModel = mongoose.model('NecessaryData', dataSchema);

module.exports = NecessaryDataModel;
 
