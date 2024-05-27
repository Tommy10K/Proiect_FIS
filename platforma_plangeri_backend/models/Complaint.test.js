const mongoose = require('mongoose');
const Complaint = require('./Complaint');

describe('Complaint Model Test', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost/test', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('create & save complaint successfully', async () => {
    const complaintData = {
      title: 'Test Complaint',
      description: 'Test Description',
      location: 'Test Location',
      city: 'Test City'
    };
    const validComplaint = new Complaint(complaintData);
    const savedComplaint = await validComplaint.save();

    expect(savedComplaint._id).toBeDefined();
    expect(savedComplaint.title).toBe(complaintData.title);
    expect(savedComplaint.description).toBe(complaintData.description);
    expect(savedComplaint.location).toBe(complaintData.location);
    expect(savedComplaint.city).toBe(complaintData.city);
  });

  it('create complaint without required field should fail', async () => {
    const complaintWithoutRequiredField = new Complaint({ title: 'Test Complaint' });
    let err;
    try {
      const savedComplaintWithoutRequiredField = await complaintWithoutRequiredField.save();
      err = savedComplaintWithoutRequiredField;
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.description).toBeDefined();
  });
});
