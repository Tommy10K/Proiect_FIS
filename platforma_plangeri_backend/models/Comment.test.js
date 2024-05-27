const mongoose = require('mongoose');
const Comment = require('./Comment');

describe('Comment Model Test', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost/test', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('create & save comment successfully', async () => {
    const commentData = { text: 'Test Comment' };
    const validComment = new Comment(commentData);
    const savedComment = await validComment.save();

    expect(savedComment._id).toBeDefined();
    expect(savedComment.text).toBe(commentData.text);
  });

  it('create comment without required field should fail', async () => {
    const commentWithoutRequiredField = new Comment({});
    let err;
    try {
      const savedCommentWithoutRequiredField = await commentWithoutRequiredField.save();
      err = savedCommentWithoutRequiredField;
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.text).toBeDefined();
  });
});
