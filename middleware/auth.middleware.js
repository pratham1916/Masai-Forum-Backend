const jwt  = require("jsonwebtoken");
const { UserModel } = require("../model/user.model");

const auth = (req, res, next) => {
    const token = req.headers.authorization
    if(token){
        jwt.verify(token,"masai",async(err,decode)=>{
            if(decode){
                const{ userID } = decode;
                const user = await UserModel.findOne({_id : userID});
                const requiredRole = user.role;
                req.role = requiredRole
                req.body.userID = decode.userID
                req.body.username = decode.username
                next();
            }
        })
    }
    else{
        res.json({ msg: "Please Login" })
    }
}

const isPostOwner = async (req, res, next) => {
    try {
        const post = await PostModel.findById(req.params.post_id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        if (post.user_id.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        next();
    } catch (error) {
        return res.status(400).json({ message: 'An error occurred' });
    }
};

module.exports = {
    auth,isPostOwner
}