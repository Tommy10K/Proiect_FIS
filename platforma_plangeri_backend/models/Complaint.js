const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ComplaintSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  posterName: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    default: 'nou', 
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
}, {
  timestamps: true
});

ComplaintSchema.index({ title: 'text' });

module.exports = mongoose.model('complaints', ComplaintSchema);
