const Application = require("../models/Application");
const Job = require("../models/Job");

async function apply(req, res, next) {
  try {
    const { coverLetter = "", resume = "" } = req.body;
    const job = await Job.findById(req.params.jobId);

    if (!job || !job.isActive) {
      return res.status(404).json({ message: "Job not found or closed" });
    }

    const existing = await Application.findOne({
      student: req.user._id,
      job: req.params.jobId
    });

    if (existing) return res.status(409).json({ message: "Already applied" });

    const application = await Application.create({
      student: req.user._id,
      job: req.params.jobId,
      coverLetter,
      resume: resume || req.user.resume || ""
    });

    const populated = await application.populate([
      { path: "job", populate: { path: "company", select: "name logo" } },
      { path: "student", select: "name email skills resume education experience" }
    ]);

    res.status(201).json(populated);
  } catch (error) {
    next(error);
  }
}

async function myApplications(req, res, next) {
  try {
    const apps = await Application.find({ student: req.user._id })
      .populate({
        path: "job",
        populate: { path: "company", select: "name logo location" }
      })
      .sort("-createdAt");
    res.json(apps);
  } catch (error) {
    next(error);
  }
}

async function applicantsForJob(req, res, next) {
  try {
    const job = await Job.findOne({
      _id: req.params.jobId,
      recruiter: req.user._id
    });

    if (!job) return res.status(404).json({ message: "Job not found or not yours" });

    const apps = await Application.find({ job: job._id })
      .populate("student", "name email phone skills education experience resume")
      .sort("-createdAt");

    res.json(apps);
  } catch (error) {
    next(error);
  }
}

async function updateStatus(req, res, next) {
  try {
    const allowed = [
      "Applied", "Under Review", "Shortlisted",
      "Interview", "Selected", "Rejected"
    ];

    if (!allowed.includes(req.body.status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const application = await Application.findById(req.params.id).populate("job");

    if (!application || String(application.job.recruiter) !== String(req.user._id)) {
      return res.status(404).json({ message: "Application not found" });
    }

    application.status = req.body.status;
    await application.save();

    res.json(application);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  apply, myApplications, applicantsForJob, updateStatus
};
