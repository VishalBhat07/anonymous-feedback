const express = require("express");
const {
  submitFeedback,
  viewFeedback,
} = require("../controllers/feedbackController.js");
const authMiddleware = require("../middleware/authMiddleware.js");

const router = express.Router();

router.post("/submit", authMiddleware, submitFeedback);
router.get("/view", authMiddleware, viewFeedback);

module.exports = router;
