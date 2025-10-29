const CompanyJob = require('../models/CompanyJob');
const Application = require('../models/PostEnroll');

// User applies for a job
const JobApply = async (req, res) => {
  const jobId = req.params.id;
  const job = await CompanyJob.findById(jobId);
  if (!job) return res.status(404).json({ message: "Job not found" });

  const alreadyApplied = await Application.findOne({ job: jobId, user: req.user._id });
  if (alreadyApplied)
    return res.status(400).json({ message: "You already applied for this job" });

  const application = new Application({ job: jobId, user: req.user._id });
  await application.save();

  res.json({ message: "Applied successfully", application });
};

// Get all jobs (for user dashboard)
const GetAllJobs = async (req, res) => {
  const jobs = await CompanyJob.find().populate('company', 'name location');
  res.json(jobs);
};

// Get applications of a user (for My Applications page)
const GetUserApplications = async (req, res) => {
  try {
    const userId = req.user.id;
    const applications = await Application.find({ user: userId })
      .populate("job", "title")
      .populate({ path: "job", populate: { path: "company", select: "name" } });

    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: "Error fetching applications" });
  }
};

module.exports = { JobApply, GetAllJobs, GetUserApplications };
