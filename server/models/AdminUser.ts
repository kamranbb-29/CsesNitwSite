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