const Complaint = require('../models/Complaint');
const Comment = require('../models/Comment');

exports.createComplaint = async (req, res) => {
  const { title, description, location, city } = req.body;
  const posterName = req.user.name;

  try {
    const complaint = new Complaint({
      title,
      description,
      location,
      posterName,
      user: req.user._id,
      city,
    });
    await complaint.save();
    res.status(201).json({ message: 'Complaint created successfully', complaint });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllComplaints = async (req, res) => {
  try {
    const query = req.user.role === 'primarie' ? { city: req.user.name } : {};
    const complaints = await Complaint.find(query).populate('user', 'name email').sort({
      status: 1,
      createdAt: -1,
    });
    res.status(200).json(complaints);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getUserComplaints = async (req, res) => {
  try {
    const userId = req.user._id;
    const complaints = await Complaint.find({ user: userId }).populate('user', 'name email').sort({
      status: 1,
      createdAt: -1,
    });
    res.status(200).json(complaints);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getComplaintById = async (req, res) => {
  const { id } = req.params;
  try {
    const complaint = await Complaint.findById(id).populate('comments');
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }
    res.status(200).json(complaint);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateComplaint = async (req, res) => {
  const { id } = req.params;
  const { title, description, location, status } = req.body;
  try {
    const complaint = await Complaint.findById(id);
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }
    if (req.user.role !== 'primarie') {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    complaint.title = title;
    complaint.description = description;
    complaint.location = location;
    complaint.status = status;
    await complaint.save();
    res.status(200).json({ message: 'Complaint updated successfully', complaint });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteComplaint = async (req, res) => {
  const { id } = req.params;
  try {
    const complaint = await Complaint.findById(id);
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }
    if (req.user.role !== 'primarie') {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    await complaint.remove();
    res.status(200).json({ message: 'Complaint deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.addComment = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  try {
    const complaint = await Complaint.findById(id);
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    const user = req.user.name;
    const comment = new Comment({
      user,
      text,
    });

    await comment.save();
    complaint.comments.push(comment._id);
    await complaint.save();

    res.status(201).json({ message: 'Comment added successfully', comment });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getComments = async (req, res) => {
  const { id } = req.params;
  try {
    const complaint = await Complaint.findById(id).populate('comments.user', 'name');
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }
    res.status(200).json(complaint.comments);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
