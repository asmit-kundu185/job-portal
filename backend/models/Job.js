const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  requirements: { type: String, default: "" },
  skills: { type: [String], default: [] },
  salaryMin: { type: Number, default: 0 },
  salaryMax: { type: Number, default: 0 },
  location: { type: String, default: "" },
  jobType: {
    type: String,
    enum: ["Full-time", "Part-time", "Internship", "Contract", "Remote"],
    default: "Full-time"
  },
  experience: { type: String, default: "Fresher" },
  company: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
  recruiter: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

jobSchema.index({
  title: "text",
  description: "text",
  location: "text",
  skills: "text"
});

module.exports = mongoose.model("Job", jobSchema);
