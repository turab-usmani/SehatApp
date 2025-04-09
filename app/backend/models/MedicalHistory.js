const mongoose = require('mongoose');

const medicalHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  conditions: [{
    name: {
      type: String,
      required: true,
    },
    date: String,
    notes: String,
  }],
  allergies: [{
    name: {
      type: String,
      required: true,
    },
    notes: String,
  }],
  medications: [{
    name: {
      type: String,
      required: true,
    },
    dosage: String,
    frequency: String,
    notes: String,
  }],
  surgeries: [{
    name: {
      type: String,
      required: true,
    },
    date: String,
    hospital: String,
    notes: String,
  }],
  familyHistory: [{
    condition: {
      type: String,
      required: true,
    },
    relation: {
      type: String,
      required: true,
    },
    notes: String,
  }],
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('MedicalHistory', medicalHistorySchema); 