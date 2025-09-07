const nodemailer = require('nodemailer');
require('dotenv').config()


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

/**
 * Sends course registration confirmation mail
 * @param {string} email - Student email
 * @param {string} name - Student name
 * @param {string} courseName - Course name
 */
const sendCourseMail = async (email, name, courseName) => {
    const mailOptions = {
        from: '"Pninfosys IT Company Gwalior" <officialemail@gmail.com>',
        to: email,
        subject: "Course Registration Confirmation - Pninfosys",
        html: `
        <div style="font-family: Arial, sans-serif; background-color:#f9fafb; padding:30px;">
            <div style="max-width:600px; margin:0 auto; background:#ffffff; border-radius:8px; box-shadow:0 2px 8px rgba(0,0,0,0.1); overflow:hidden;">
                
                <!-- Header -->
                <div style="background:#2563eb; padding:20px; text-align:center; color:#fff;">
                    <h1 style="margin:0; font-size:22px;">Pninfosys IT Company</h1>
                    <p style="margin:5px 0 0; font-size:14px;">Shaping Careers, Building Futures</p>
                </div>
                
                <!-- Body -->
                <div style="padding:25px; color:#333; line-height:1.6;">
                    <h2 style="font-size:20px; color:#111;">Hello ${name},</h2>
                    <p style="font-size:15px;">Congratulations! We are delighted to inform you that your registration for the course <strong style="color:#2563eb;">${courseName}</strong> has been successfully confirmed.</p>
                    
                    <p style="font-size:15px;">At <strong>Pninfosys</strong>, we are committed to providing the best learning experience with real-world projects, expert mentorship, and career guidance. Your journey towards success starts here 🚀.</p>
                    
                    <div style="background:#f3f4f6; padding:15px; border-radius:6px; margin:20px 0;">
                        <p style="margin:0; font-size:14px; color:#555;">
  📌 <strong>Next Steps:</strong><br/>
  ✔️ Join regular doubt-clearing sessions.<br/>
  ✔️ Work on real-time projects assigned during training.<br/>
  ✔️ Complete assignments to strengthen your concepts.<br/>
  ✔️ Stay consistent and prepare for placement opportunities.<br/>
</p>
                    </div>
                    
                    <p style="font-size:15px;">If you have any questions, our support team is always here to help you.</p>
                    
                    <p style="margin-top:20px; font-size:14px; color:#555;">Best Regards,</p>
                    <p style="font-weight:bold; font-size:15px; margin:0;">Pninfosys Team</p>
                </div>
                
                <!-- Footer -->
                <div style="background:#f3f4f6; padding:15px; text-align:center; font-size:12px; color:#777;">
                    <p style="margin:0;">© ${new Date().getFullYear()} Pninfosys IT Company. All rights reserved.</p>
                    <p style="margin:5px 0 0;">📍 Gwalior, India | 🌐 www.pninfosys.com</p>
                </div>
            </div>
        </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Course registration mail sent to:", email);
    } catch (err) {
        console.error("Error sending email:", err.message);
    }
};


module.exports = sendCourseMail;
