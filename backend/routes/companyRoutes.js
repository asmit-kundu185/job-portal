const router = require("express").Router();
const { protect, authorize } = require("../middleware/authMiddleware");
const {
  createCompany, getCompanies, getCompany, updateCompany, deleteCompany
} = require("../controllers/companyController");

router.get("/", getCompanies);
router.get("/:id", getCompany);
router.post("/", protect, authorize("recruiter"), createCompany);
router.put("/:id", protect, authorize("recruiter"), updateCompany);
router.delete("/:id", protect, authorize("recruiter"), deleteCompany);

module.exports = router;
