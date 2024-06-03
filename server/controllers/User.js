import User from '../models/User.js';
import CustomError from '../utilities/errorHelpers/CustomErrorHandler.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import asyncErrorHandler from '../utilities/errorHelpers/AsyncErrorHandler.js';
import ERROR_MESSAGE from '../constants/ErrorMessages.js';
import STATUS_CODE from '../constants/StatusCode.js';
import nodemailer from 'nodemailer';


export const signupUser = asyncErrorHandler(async (req, res, next) => {

    const {
        name,
        email,
        password,
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        name: name,
        email: email,
        password: hashedPassword
    });

    if (!user) {
        return next(new CustomError(ERROR_MESSAGE.INTERNAL_SERVER_ERROR, STATUS_CODE.SERVER_ERROR));
    }

    res.status(200).json({
        message: "User is created",
        status: true,
        content: {
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                created_at: user.createdAt
            },
        }
    })

}
)

export const loginUser = asyncErrorHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
        return next(new CustomError(ERROR_MESSAGE.NOT_FOUND, STATUS_CODE.NOT_FOUND));
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {

        return next(new CustomError('Bad Credentials', 402));
    }

    const payload = {
        _id: user._id,
        email: user.email
    }
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '24h' });

    res.cookie("token", token, { httpOnly: true, secure: true })
        .status(200).json({
            message: 'Logged in',
            status: true,
            content: {
                data: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    created_at: user.createdAt
                },
            }
        })
})

export const resetPasswordOTP = asyncErrorHandler(
    async (req, res, next) => {

        const { email } = req.body;


        const user = await User.findOne({
            email: email,
        });

        if (!user) {
            return next(new CustomError("User not found!", 404));
        }


        const otp = Math.floor(100000 + Math.random() * 900000);
        const expiresAt = Date.now() + 10 * 60 * 1000; ;
        await User.findOneAndUpdate({_id: user}, {otp: otp, otpExpiresAt:expiresAt});

        var transporter = nodemailer.createTransport({
            service: "gmail",
            port: 465,
            secure: true,
            secureConnection: false,
            auth: {
                user: process.env.NODEMAILER_EMAIL,
                pass: process.env.NODEMAILER_PASSWORD,
            },
        });

        var option = {
            from: "satyadav941@gmail.com",
            to: email,
            subject: "OTP",
            html: `<div>
              <p>Dear ${user.name},</p>
              <p>Forgot your password?</p>
              <p>We received a request to reset the password for your account.</p>
              <p>To reset the password, Kindly check the given below OTP.</p>
              <p>Expires in 10 minutes</p>
              <p><strong>Please do not share with anyone OTP-: ${otp}</strong></p>
              <p>Regards</p>
              <p><strong>Satyam</strong></p>
              </div>`,
        };

        transporter.sendMail(option, (err, info) => {
            if (err) {
                return next(new CustomError("Error while sending email", 500));
            }
        });
        res.status(200).send({ success: "Email Sent Successfully", otp: otp });
    },
)


export const updatePassword = asyncErrorHandler(async (req, res, next) => {
    const {otp, password, email} = req.body;
    console.log("body -- ", req.body);

    const user = await User.findOne({email: email});
    console.log("user --- ", user)
    if(!user){
        return next(new CustomError("User not found!", 404));
    }

    if(otp !== user.otp && user.otpExpiresAt < Date.now()){
        return next(new CustomError("Invalid OTP", 400));
    }

    const newPassword = await bcrypt.hash(password, 10);

    const updatedUser = await User.findOneAndUpdate({email: email}, {password: newPassword, otp:null, otpExpiresAt:""});

    if(!updatedUser){
        return next(new CustomError("Something went wrong", 500));
    }

    res.status(200).send({
        message:"Password updated successfully"
    })

},
)

