const userModel = require('../../model/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



class AdminController {

    static CreateRegistration = async (req, res) => {
        try {
            // console.log(req.body);
            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                return res.status(400).json({
                    status: "failed",
                    message: "All fields are required!"
                });
            }

            const isUser = await userModel.findOne({ email });
            if (isUser) {
                return res.status(400).json({
                    status: "failed",
                    message: "Email already exists"
                });
            }


            const hashPassword = await bcrypt.hash(password, 10);

            // Create a new user
            const userData = await userModel.create({
                name,
                email,
                password: hashPassword,
            });
            return res.status(201).json({
                status: "success",
                message: "User registered successfully",
                data: userData,
            });
        } catch (error) {
            console.error(error);
        }
    }
    static verifyLogin = async (req, res) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    status: "failed",
                    message: "Email and password are required.",
                });
            }
            const user = await userModel.findOne({ email });
            if (!user) {
                return res.status(401).json({
                    status: "failed",
                    message: "You are not a registered user.",
                });
            }
            // Check role
            if (user.role !== "admin") {
                return res.status(403).json({
                    status: "failed",
                    message: "Access denied. Only admin can login.",
                });
            }

            const isMatched = await bcrypt.compare(password, user.password);
            if (!isMatched) {
                return res.status(401).json({
                    status: "failed",
                    message: "Invalid email or password.",
                });
            }
            // Generate JWT token
            const token = jwt.sign({ ID: user._id }, process.env.SECRETKEY);

            res.cookie("token", token);
            // console.log("Generated token:",token);

            return res.status(200).json({
                success: true,
                message: "Login successful.",
                token,
                user,
            });
        } catch (error) {
            console.error(error)
        }
    };
    // GET /api/admin/dashboard (Protected)
    static async dashboard(req, res) {
        res.status(200).json({
            message: 'Welcome to Admin Dashboard ✅'
        });
    }
    static getUsers = async (req, res) => {
        try {
            const getuser = await userModel.find()
            return res.status(201).json({
                success: true,
                message: 'users Displayed',
                data: getuser
            })

        } catch (error) {
            console.log(error)
        }
    }
    static logout = async (req, res) => {
        try {
            res.clearCookie('token');
            return res.status(200).json({
                success: true,
                message: "logout successfull !"
            })
        } catch (error) {
            console.log(error)
        }
    }
    static changePassword = async (req, res) => {
        try {
            const { id } = req.udata;
            const { op, np, cp } = req.body;
            // console.log(req.body)
            const user = await userModel.findById(id);
            // console.log(user)

            //verifiying old password
            const isMatched = await bcrypt.compare(op, user.password);
            if (!isMatched) {
                return res.status(401).json({
                    success: false,
                    message: "Old Password is incorrect",
                });
            }
            if (np !== cp) {
                return res.status(401).json({
                    success: false,
                    message: "New Password and Confirm Password are not same",
                });
            }
            //new password
            const hashedPassword = await bcrypt.hash(np, 10);
            await userModel.findByIdAndUpdate(id, {
                password: hashedPassword
            });
            return res.status(201).json({
                success: true,
                message: "Password Changed Successfully",
            });

        } catch (error) {
            console.log(error);
        }
    }
    static Updateprofile = async (req, res) => {
        try {
            const { id } = req.udata;
            const { name, email } = req.body;
            var data = {
                name: name,
                email: email

            }
            await userModel.findByIdAndUpdate(id, data);
            return res.status(201).json({
                success: true,
                message: "Profile Updated Successfully",
            });

        } catch (error) {
            console.log(error);
        }
    }
    static forgotPassword = async (req, res) => {
        try {
            const { email, newPassword } = req.body;

            if (!email) {
                return res.status(400).json({
                    success: false,
                    message: "Email is required."
                });
            }

            // check user exist
            const user = await userModel.findOne({ email });
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found with this email."
                });
            }

            // Step 1: agar newPassword nahi bheja gaya → sirf email validation
            if (!newPassword) {
                return res.status(200).json({
                    success: true,
                    message: "Email exists, you can reset password."
                });
            }

            // Step 2: agar newPassword bhi bheja gaya → password update
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await userModel.findOneAndUpdate(
                { email },
                { password: hashedPassword }
            );

            return res.status(200).json({
                success: true,
                message: "Password reset successful"
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: "Something went wrong"
            });
        }
    };

}
module.exports = AdminController