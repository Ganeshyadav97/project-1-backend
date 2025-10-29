const express=require("express");
const { JobApply, GetAllJobs,GetUserApplications} = require("../Controllers/UserAc");
const { authMiddleWare } = require("../middlewares/auth");
const router=express.Router()
router.post("/apply/:id",authMiddleWare,JobApply)
router.get("/applications",authMiddleWare,GetUserApplications)
router.get("/getjobs",authMiddleWare,GetAllJobs)
module.exports=router