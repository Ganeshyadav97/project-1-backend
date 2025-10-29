const mongoose = require('mongoose');
const companyJobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: String,
  description: String,
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true }
});

module.exports = mongoose.model('CompanyJob', companyJobSchema);
