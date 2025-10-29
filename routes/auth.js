const {Login,SignUp, AdminAuth, CompanyAuth}=require("../Controllers/User")
const {authMiddleWare}=require("../middlewares/auth")
const express=require("express");
const router=express.Router();
router.post('/user/signup',SignUp);
router.post('/user/login',Login);
router.post('/admin/login',AdminAuth)
router.post('/company/login',CompanyAuth)
module.exports=router;