const router = require("express").Router();
const { protect, authorize } = require("../middleware/authMiddleware");
const {
  createJob, getJobs, getJob, updateJob, deleteJob, getMyJobs,
  saveJob, unsaveJob, getSavedJobs
} = require("../controllers/jobController");

router.get("/", getJobs);
router.get("/recruiter/mine", protect, authorize("recruiter"), getMyJobs);
router.get("/saved/list", protect, authorize("student"), getSavedJobs);
router.get("/:id", getJob);

router.post("/", protect, authorize("recruiter"), createJob);
router.put("/:id", protect, authorize("recruiter"), updateJob);
router.delete("/:id", protect, authorize("recruiter"), deleteJob);

router.post("/:id/save", protect, authorize("student"), saveJob);
router.delete("/:id/save", protect, authorize("student"), unsaveJob);

module.exports = router;
