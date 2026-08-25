const Company = require("../models/Company");

async function createCompany(req, res, next) {
  try {
    const company = await Company.create({
      ...req.body,
      recruiter: req.user._id
    });
    res.status(201).json(company);
  } catch (error) {
    next(error);
  }
}

async function getCompanies(req, res, next) {
  try {
    const companies = await Company.find()
      .populate("recruiter", "name email")
      .sort("-createdAt");
    res.json(companies);
  } catch (error) {
    next(error);
  }
}

async function getCompany(req, res, next) {
  try {
    const company = await Company.findById(req.params.id)
      .populate("recruiter", "name email");
    if (!company) return res.status(404).json({ message: "Company not found" });
    res.json(company);
  } catch (error) {
    next(error);
  }
}

async function updateCompany(req, res, next) {
  try {
    const company = await Company.findOneAndUpdate(
      { _id: req.params.id, recruiter: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!company) return res.status(404).json({ message: "Company not found or not yours" });
    res.json(company);
  } catch (error) {
    next(error);
  }
}

async function deleteCompany(req, res, next) {
  try {
    const company = await Company.findOneAndDelete({
      _id: req.params.id,
      recruiter: req.user._id
    });
    if (!company) return res.status(404).json({ message: "Company not found or not yours" });
    res.json({ message: "Company deleted" });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createCompany, getCompanies, getCompany, updateCompany, deleteCompany
};
