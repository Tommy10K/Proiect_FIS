const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaintController');
const { ensureAuthenticated, ensurePrimarie } = require('../middleware/auth');

router.post('/', ensureAuthenticated, complaintController.createComplaint);
router.get('/', ensureAuthenticated, complaintController.getAllComplaints);
router.get('/my-complaints', ensureAuthenticated, complaintController.getUserComplaints);
router.get('/:id', ensureAuthenticated, complaintController.getComplaintById);
router.post('/:id/comments', ensureAuthenticated, complaintController.addComment);
router.get('/:id/comments', ensureAuthenticated, complaintController.getComments);
router.put('/:id', ensureAuthenticated, ensurePrimarie, complaintController.updateComplaint);
router.delete('/:id', ensureAuthenticated, ensurePrimarie, complaintController.deleteComplaint);

module.exports = router;
