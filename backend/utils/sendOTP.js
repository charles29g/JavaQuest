import nodemailer from "nodemailer";
import OTP from "../models/otpModel.js";

export const sendOTP = async (email) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  await OTP.deleteMany({ email });

  await OTP.create({ email, otp });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your JavaQuest OTP",
    text: `Your OTP is: ${otp}`,
  });

  return otp;
};
