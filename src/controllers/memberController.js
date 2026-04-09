const LearnIndiaMember = require("../models/LearnIndiaMember");

const createMember = async (req, res) => {
  try {
    const payload = req.body || {};

    // Create the member directly. Mongoose handles everything else based on your schema.
    const newMember = await LearnIndiaMember.create(payload);

    return res.status(201).json({
      success: true,
      message: "Member created successfully",
      data: newMember,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Validation or create error",
      error: error.message,
    });
  }
};

module.exports = {
  createMember,
};
