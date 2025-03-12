const Feedback = require("../models/Feedback.js");

exports.submitFeedback = async (req, res) => {
  if (req.user.role !== "student")
    return res.status(403).json({ error: "Only students can submit feedback" });

  const { sessionId, feedback } = req.body;
  const existingFeedback = await Feedback.findOne({
    sessionId,
    studentId: req.user.id,
  });

  if (existingFeedback)
    return res.status(400).json({ error: "Feedback already submitted" });

  const newFeedback = new Feedback({
    sessionId,
    feedback,
    studentId: req.user.id,
  });
  await newFeedback.save();
  res.json({ message: "Feedback submitted" });
};

exports.viewFeedback = async (req, res) => {
  if (req.user.role !== "teacher")
    return res.status(403).json({ error: "Only teachers can view feedback" });

  const feedbacks = await Feedback.find({}, "sessionId feedback -_id");
  res.json(feedbacks);
};
