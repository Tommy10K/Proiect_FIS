const Complaint = require('../models/Complaint');

exports.createComplaint = async (req, res) => {
  const { title, description, location, user } = req.body;
  try {
    const complaint = new Complaint({ title, description, location, user });
    await complaint.save();
    res.status(201).json({ message: 'Complaint created successfully', complaint });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().populate('user', 'name email');
    res.status(200).json(complaints);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getComplaintById = async (req, res) => {
  const { id } = req.params;
  try {
    const complaint = await Complaint.findById(id).populate('user', 'name email');
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
    await complaint.remove();
    res.status(200).json({ message: 'Complaint deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};