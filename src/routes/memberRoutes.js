const express = require("express");
const router = express.Router();
const memberController = require("../controllers/memberController");

router.post("/", memberController.createMember);

// router.post('/', async (req, res) => {
//   try {
//     const payload = req.body || {};
//     payload.officeUse = payload.officeUse || {};
//     payload.memberIdentification = payload.memberIdentification || {};

//     if (blank(payload.officeUse.chfn) || payload.officeUse.chfn === 'Auto-generated') {
//       payload.officeUse.chfn = `CHFN-${ymd()}-${rand(6)}`;
//     }
//     if (blank(payload.officeUse.sefn) || payload.officeUse.sefn === 'Auto-generated') {
//       payload.officeUse.sefn = `SEFN-${ymd()}-${rand(6)}`;
//     }
//     if (blank(payload.officeUse.olfn) || payload.officeUse.olfn === 'Auto-generated') {
//       payload.officeUse.olfn = `OLFN-${ymd()}-${rand(6)}`;
//     }
//     if (
//       blank(payload.officeUse.dateTimeOfFilling) ||
//       Number.isNaN(new Date(payload.officeUse.dateTimeOfFilling).getTime())
//     ) {
//       payload.officeUse.dateTimeOfFilling = new Date();
//     }
//     if (blank(payload.officeUse.receiptNo)) {
//       payload.officeUse.receiptNo = `RCP-${ymd()}-${rand(5)}`;
//     }
//     if (blank(payload.officeUse.enrollmentType)) {
//       payload.officeUse.enrollmentType = 'Self';
//     }

//     if (
//       blank(payload.memberIdentification.memberId) ||
//       payload.memberIdentification.memberId === 'Auto-generated'
//     ) {
//       payload.memberIdentification.memberId = `LIL${ymd()}${rand(6)}`;
//     }
//     if (
//       blank(payload.memberIdentification.qrCodeReference) ||
//       payload.memberIdentification.qrCodeReference === 'Auto-generated'
//     ) {
//       payload.memberIdentification.qrCodeReference = `QR-${rand(8)}`;
//     }

//     const newMember = await LearnIndiaMember.create(payload);
//     return res.status(201).json({
//       success: true,
//       message: 'Member created successfully',
//       data: newMember
//     });
//   } catch (error) {
//     return res.status(400).json({
//       success: false,
//       message: 'Validation or create error',
//       error: error.message
//     });
//   }
// });

router.get("/", async (_req, res) => {
  try {
    const members = await LearnIndiaMember.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: members.length,
      data: members,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch members",
      error: error.message,
    });
  }
});

module.exports = router;
