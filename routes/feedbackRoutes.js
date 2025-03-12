const express = require("express");
const {
  submitFeedback,
  viewFeedback,
} = require("../controllers/feedbackController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/submit", authMiddleware, submitFeedback);
router.get("/view", authMiddleware, viewFeedback);

module.exports = router;
