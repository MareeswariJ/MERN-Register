const User = require('../models/userModel');


// Registration: User submits a form with their name, phone, email, password, and user type to create an account.
exports.Register= async(req,res)=>{
    try{
        const {name,phone,email,password,dob,hobbies,gender,address}=req.body;

        const existingUser = await User.findOne({email});
        if(existingUser){
            res.status(400).json({message:"User is already Existing"});
        }
        const newUser = new User({
            name,
            phone,
            email,
            password,
            dob,
            hobbies,
            gender,
            address
        })
        await newUser.save();
        res.status(200).json({
            successs:true,
            message:"Register Successfully",
            User:newUser
        })
       
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

// Login: User submits their email and password to log in, and the system checks for matching credentials.

exports.Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email" }); // Use return to stop further execution
        }

        // Check if password matches
        if (user.password !== password) {
            return res.status(400).json({ message: "Invalid password" }); // Use return to stop further execution
        }

        // If login is successful, return user data
        return res.status(200).json({
            success: true,
            User: {
                id: user._id,
                name: user.name,
                email: user.email,
                password: user.password, // Usually, passwords should not be sent like this.
                phone: user.phone,
                dob:user.dob,
                gender:user.gender,
                hobbies:user.hobbies,
                address:user.address
            
            }
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};


// Logout: When a user clicks the logout button, their session is destroyed, effectively logging them out of the system.



