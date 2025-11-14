const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters'],
      maxlength: [100, 'Title must be at most 100 characters'],
    },
    status: {
      type: String,
      enum: ['incomplete', 'complete'],
      default: 'incomplete',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Goal', goalSchema);
