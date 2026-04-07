const express = require('express');
const LearnIndiaMember = require('../models/LearnIndiaMember');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const newMember = await LearnIndiaMember.create(req.body);
    return res.status(201).json({
      success: true,
      message: 'Member created successfully',
      data: newMember
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation or create error',
      error: error.message
    });
  }
});

router.get('/', async (_req, res) => {
  try {
    const members = await LearnIndiaMember.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: members.length,
      data: members
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch members',
      error: error.message
    });
  }
});

module.exports = router;
