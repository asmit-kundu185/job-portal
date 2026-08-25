const Job = require("../models/Job");
const SavedJob = require("../models/SavedJob");

async function createJob(req, res, next) {
  try {
    const { company } = req.body;
    const job = await Job.create({
      ...req.body,
      company,
      recruiter: req.user._id
    });
    const populated = await job.populate("company", "name logo location website");
    res.status(201).json(populated);
  } catch (error) {
    next(error);
  }
}

async function getJobs(req, res, next) {
  try {
    const {
      search = "",
      location = "",
      jobType = "",
      experience = "",
      page = 1,
      limit = 10
    } = req.query;

    const filter = { isActive: true };

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { skills: { $regex: search, $options: "i" } }
      ];
    }

    if (location) filter.location = { $regex: location, $options: "i" };
    if (jobType) filter.jobType = jobType;
    if (experience) filter.experience = { $regex: experience, $options: "i" };

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Job.countDocuments(filter);

    const jobs = await Job.find(filter)
      .populate("company", "name logo location website")
      .populate("recruiter", "name email")
      .sort("-createdAt")
      .skip(skip)
      .limit(Number(limit));

    res.json({
      jobs,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit))
    });
  } catch (error) {
    next(error);
  }
}

async function getJob(req, res, next) {
  try {
    const job = await Job.findById(req.params.id)
      .populate("company", "name description logo location website")
      .populate("recruiter", "name email");

    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (error) {
    next(error);
  }
}

async function updateJob(req, res, next) {
  try {
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, recruiter: req.user._id },
      req.body,
      { new: true, runValidators: true }
    ).populate("company", "name logo location website");

    if (!job) return res.status(404).json({ message: "Job not found or not yours" });
    res.json(job);
  } catch (error) {
    next(error);
  }
}

async function deleteJob(req, res, next) {
  try {
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, recruiter: req.user._id },
      { isActive: false },
      { new: true }
    );
    if (!job) return res.status(404).json({ message: "Job not found or not yours" });
    res.json({ message: "Job closed successfully" });
  } catch (error) {
    next(error);
  }
}

async function getMyJobs(req, res, next) {
  try {
    const jobs = await Job.find({ recruiter: req.user._id })
      .populate("company", "name logo")
      .sort("-createdAt");
    res.json(jobs);
  } catch (error) {
    next(error);
  }
}

async function saveJob(req, res, next) {
  try {
    await SavedJob.create({ student: req.user._id, job: req.params.id });
    res.status(201).json({ message: "Job saved" });
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ message: "Job already saved" });
    next(error);
  }
}

async function unsaveJob(req, res, next) {
  try {
    await SavedJob.findOneAndDelete({ student: req.user._id, job: req.params.id });
    res.json({ message: "Job removed from saved jobs" });
  } catch (error) {
    next(error);
  }
}

async function getSavedJobs(req, res, next) {
  try {
    const saved = await SavedJob.find({ student: req.user._id })
      .populate({
        path: "job",
        populate: { path: "company", select: "name logo location" }
      })
      .sort("-createdAt");
    res.json(saved.map(item => item.job).filter(Boolean));
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createJob, getJobs, getJob, updateJob, deleteJob, getMyJobs,
  saveJob, unsaveJob, getSavedJobs
};
