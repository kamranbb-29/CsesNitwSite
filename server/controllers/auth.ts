import { Request, Response } from "express";
import bycrypt from "bcryptjs";
import AdminUser from "../models/AdminUser";

export const addAdmin = async (req: Request, res: Response) => {
    try{
        const {name, email, password, role} = req.body;
        if(!email || !password || !name || !role){
            return res.status(400).json({
                message: "Email and Password are Required!",
            });
        }

         const existingUser = await AdminUser.findOne({email, });
        if(existingUser){
            console.log("Admin Already Exists");
        }

        const pwdHash = await bycrypt.hash(password, 12);

        await AdminUser.create({
            name,
            email,
            pwdHash,
            role,
        });

        console.log("Admin Added Successfully!");

        return res.status(201).json({
            message: "Admin Added Successfully!",
        });
    } catch(error){
        console.log("Error: ", error);

    }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and Password are Required!",
      });
    }

    const user = await AdminUser.findOne({
      email: email.trim(),
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid Email or Password",
      });
    }

    const matchPwd = await bycrypt.compare(password, user.pwdHash);

    if (!matchPwd) {
      return res.status(401).json({
        message: "Invalid Email or Password",
      });
    }

    req.session.userId = user._id.toString();
    req.session.role = user.role as "gen_sec" | "team_lead" | "pr" | "editor";

    return res.status(200).json({
      message: "Login Successful!",

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login Error: ", error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const logout = (req: Request, res: Response) => {
  req.session.destroy((error) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }

    res.clearCookie("cses.sid");
    return res.status(200).json({
      message: "Logged Out Successfully!",
    });
  });
};

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({
        message: "Not Authenticated",
      });
    }

    const user = await AdminUser.findById(req.session.userId).select(
      "-pwdHash",
    );

    if (!user) {
      return res.status(401).json({
        message: "Not Authenticated!",
      });
    }

    return res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
