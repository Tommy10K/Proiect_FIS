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
  status: {
    type: String,
    default: 'pending',
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
}, {
  timestamps: true
});

ComplaintSchema.index({ title: 'text' });

module.exports = mongoose.model('complaints', ComplaintSchema);
