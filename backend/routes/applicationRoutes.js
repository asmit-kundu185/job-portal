const router = require("express").Router();
const { protect, authorize } = require("../middleware/authMiddleware");
const {
  apply, myApplications, applicantsForJob, updateStatus
} = require("../controllers/applicationController");

router.post("/:jobId", protect, authorize("student"), apply);
router.get("/mine", protect, authorize("student"), myApplications);
router.get("/job/:jobId", protect, authorize("recruiter"), applicantsForJob);
router.put("/:id/status", protect, authorize("recruiter"), updateStatus);

module.exports = router;
