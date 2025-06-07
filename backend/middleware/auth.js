import jwt from 'jsonwebtoken'

const authMiddleware = async (req,res,next)=>{
    const {token} = req.headers;

    if(!token){
        return res.json({success:false,message:"Not Authorized Login Again"})
    }

    try {
        const decoded = jwt.verify(token,process.env.SECRET_KEY);
        req.body.userId = decoded.id;
        next();
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:"Error"})
    }
}

export default authMiddleware;