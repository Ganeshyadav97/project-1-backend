const express=require("express")
const Application=require("../models/PostEnroll")
const CompanyJob=require("../models/CompanyJob")
const PostJob=async(req,res)=>{
    const{title,location,description,}=req.body;
    if(!title||!location||!description){
        res.json({message:"entert the proper details"})
    }
    const companyjob=new CompanyJob({title,location,description,company: req.company._id })
    await companyjob.save()
    res.json({message:"added job"})
}
const GetAllJobs=async(req,res)=>{
    const jobs = await CompanyJob.find({ company: req.company._id });
    res.json(jobs);
}
const DeleteJob=async(req,res)=>{
    const id=req.params.id;
    const job=await CompanyJob.findById({ _id: req.params.id, company: req.company._id })
    if(!job){
        res.json({message:"no job found"})
    }
    CompanyJob.findByIdAndDelete(id)
    res.json({message:"deleted sucessfully"})
}
const UpdateJob=async (req, res) => {
  const job = await CompanyJob.findOne({ _id: req.params.id, company: req.company._id });
  if (!job) return res.status(404).json({ message: "Job not found" });

  job.title = req.body.title || job.title;
  job.location = req.body.location || job.location;
  job.description = req.body.description || job.description;

  await job.save();
  res.json({ message: "Job updated successfully", job });
};
const AcceptorRej=async(req,res)=>{
    const appli=req.params.id
    const {status}=req.body
    const application=await Application.findById(appli)
    application.status=status;
    await application.save();  
    res.json({message:"application updated"})
}


// Fetch all applications for a specific job
const GetAllApplications = async (req, res) => {
  try {
    const jobId = req.params.id;
    const applications = await Application.find({ job: jobId })
      .populate("user", "name email")
      .populate("job", "title");

    if (!applications.length) {
      return res.status(404).json({ message: "No applications found" });
    }

    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: "Error fetching applications" });
  }
};

module.exports={GetAllJobs,PostJob,DeleteJob,UpdateJob,AcceptorRej,GetAllApplications}
