
const Company = require("../models/Company");

const User=require("../models/User");

const jwt=require("jsonwebtoken");
//middle ware is going to lie between request and response (client -> routes->middlewares->controller)


const authMiddleWare = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  // If no token, stop execution
  if (!token) return res.status(401).json({ message: "No token, authorization denied" });

  // Verify token (will throw if invalid)
  const decoded = jwt.verify(token, 'MY_SECRET_KEY');

  // Find user in DB
  const user = await User.findById(decoded.userId);
  if (!user) return res.status(401).json({ message: "User not found" });

  // Attach user to request
  req.user = user;
  next();
};

const adminAuth = async(req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = await jwt.verify(token, "MY_SECRET_KEY");

    // Only allow the hardcoded admin
    if (decoded.email !== "admin@example.com") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    req.admin = decoded; // attach admin info if needed
    next(); 

};
const CompanyAuth = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "").trim();

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
  const decoded = jwt.verify(token, 'MY_SECRET_KEY');
  const company = await Company.findById(decoded.companyId);
  if (!company) {
    return res.status(401).json({ message: "Company not found" });
  }
  
  req.company = company;
  next();
};





/*const VerifyAdmin=(role)=>{
    return(res,next)=>{
        if('admin'!==role){
            return res.status(403).json({message:"you are not authorized"})
        }
        next();
    }
}
const VerifyCompany=(role)=>{
    return(res,next)=>{
        if('Company'!==role){
            return res.status(403).json({message:"you are not authorized"})
        }
        next();
    }
}
const VerifyUser=(role)=>{
    return(res,next)=>{
        if('Student'!==role){
            return res.status(403).json({message:"you are not authorized"})
        }
        next();
    }
}*/
module.exports={authMiddleWare,adminAuth,CompanyAuth};