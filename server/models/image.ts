import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  event: {
    type: String,
    required: true,
    trim: true,
  },
  mediaType: {
    type: String,
    required: true,
    default: "image",
  },
  url: {
    type: String,
    required: true,
    trim: true,
  },
});

const Image = mongoose.model("Image", imageSchema);

export default Image;
