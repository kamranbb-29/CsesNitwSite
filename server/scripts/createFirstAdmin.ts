import dotenv from "dotenv";
import mongoose from "mongoose";
import bycrypt from "bcryptjs";
import AdminUser from "../models/AdminUser";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);

    const name = "Kamran Bilal Bhat";
    const email = "kb25csb0a02@student.nitw.ac.in";
    const pwd = "i_dont_care";

    const existingUser = await AdminUser.findOne({ email });
    if (existingUser) {
      console.log("Admin Already Exists");
      process.exit(0);
    }

    const pwdHash = await bycrypt.hash(pwd, 12);

    await AdminUser.create({
      name,
      email,
      pwdHash,
      role: "pr",
    });

    console.log("Admin was created successfully!");

    await mongoose.disconnect();
  } catch (error) {
    console.log("Error: ", error);
    process.exit(1);
  }
};

createAdmin();
