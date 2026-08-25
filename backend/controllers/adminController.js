const User = require("../models/User");
const Job = require("../models/Job");
const Company = require("../models/Company");
const Application = require("../models/Application");

async function dashboard(req, res, next) {
  try {
    const [users, recruiters, students, jobs, companies, applications] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: "recruiter" }),
      User.countDocuments({ role: "student" }),
      Job.countDocuments(),
      Company.countDocuments(),
      Application.countDocuments()
    ]);

    res.json({ users, recruiters, students, jobs, companies, applications });
  } catch (error) {
    next(error);
  }
}

async function users(req, res, next) {
  try {
    const data = await User.find().select("-password").sort("-createdAt");
    res.json(data);
  } catch (error) {
    next(error);
  }
}

async function deleteUser(req, res, next) {
  try {
    if (String(req.params.id) === String(req.user._id)) {
      return res.status(400).json({ message: "You cannot delete yourself" });
    }
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (error) {
    next(error);
  }
}

async function jobs(req, res, next) {
  try {
    const data = await Job.find()
      .populate("company", "name")
      .populate("recruiter", "name email")
      .sort("-createdAt");
    res.json(data);
  } catch (error) {
    next(error);
  }
}

async function deleteJob(req, res, next) {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: "Job deleted" });
  } catch (error) {
    next(error);
  }
}

module.exports = { dashboard, users, deleteUser, jobs, deleteJob };
