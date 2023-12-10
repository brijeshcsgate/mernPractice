const fs = require('fs');
const cors = require('cors');
const express=require('express');
const multer = require('multer');

const app=express();
require('../db/conn');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const path = require('path');
require('../db/conn');
const mongoose = require('mongoose');
const DataModel =require('../model/NecessaryFeildSchema');
app.use(cors());
const storage = multer.diskStorage({
destination: './backend/uploads/',
filename: function (req, file, cb) {
  cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
}
});

const upload = multer({ storage });
// Endpoint to handle form submission
app.post('/submit', upload.array('files'), (req, res) => {
const { checkBoxValue, radioButtonValue, selectedOption } = req.body;
// if (!req.files || !req.files.length) {
//     return res.status(400).json({ error: 'No files uploaded.' });
//   }
const fileNames = req.files?.map(file => file.filename);

const newData = new DataModel({
  checkboxValue: checkBoxValue,
  radioButtonValue: radioButtonValue,
  selectedOption: selectedOption,
  files: fileNames,
});

newData.save()
  .then(data => {
    console.log('Data saved to MongoDB:', data);
    res.status(200).json({ message: 'Form data and files uploaded successfully.' });
  })
  .catch(err => {
    console.error('Error saving data to MongoDB:', err);
    res.status(500).json({ error: 'Failed to save form data and files.' });
  });
});

module.exports=app;