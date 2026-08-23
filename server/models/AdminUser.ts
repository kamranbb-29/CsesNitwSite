import mongoose from "mongoose";

const AdminUserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            reqired: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        pwdHash: {
            type: String,
            required: true,
        },

        role : {
            type: String,
            enum: ["gen_sec", "team_lead", "pr", "editor"],
            required: true,
        }
    },

    {
        timestamps: true,
    }
);

export default mongoose.model(
    "AdminUser",
    AdminUserSchema,
    "adminUsers"
);