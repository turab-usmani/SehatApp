const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  location: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  about: {
    type: String,
  },
  education: [{
    degree: String,
    institution: String,
    year: String,
  }],
  availability: [{
    day: {
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    },
    slots: [{
      time: String,
      isBooked: {
        type: Boolean,
        default: false,
      },
    }],
  }],
  reviews: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    rating: Number,
    comment: String,
    date: {
      type: Date,
      default: Date.now,
    },
  }],
});

module.exports = mongoose.model('Doctor', doctorSchema); 