const {PostJob,DeleteJob,UpdateJob, GetAllJobs, AcceptorRej}=require("../Controllers/Company")

const express=require("express");
const {CompanyAuth}=require("../middlewares/auth");
const { GetAllApplications} = require("../Controllers/Company");
const router=express.Router();
router.get('/jobs',CompanyAuth,GetAllJobs)
router.post("/post",CompanyAuth,PostJob)
router.post("/update",CompanyAuth,UpdateJob)
router.post("/delete",CompanyAuth,DeleteJob)
router.get("/getapplication/:id", CompanyAuth, GetAllApplications); 
router.put("/status/:id",CompanyAuth,AcceptorRej)
module.exports=router;
