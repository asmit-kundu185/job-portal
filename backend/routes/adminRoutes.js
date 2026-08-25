const router = require("express").Router();
const { protect, authorize } = require("../middleware/authMiddleware");
const {
  dashboard, users, deleteUser, jobs, deleteJob
} = require("../controllers/adminController");

router.use(protect, authorize("admin"));

router.get("/dashboard", dashboard);
router.get("/users", users);
router.delete("/users/:id", deleteUser);
router.get("/jobs", jobs);
router.delete("/jobs/:id", deleteJob);

module.exports = router;
