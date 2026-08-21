import { Request, Response } from "express";
import Image from "../models/image";

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
const fileURL = import.meta.url;
const filename = fileURLToPath(fileURL);
const __dirname = path.dirname(filename);

export const createImage = async (req: Request, res: Response) => {
  try {
    const { event, mediaType } = req.body;

    if (!req.file) {
      return res.status(400).json({
        message: "Image file is required",
      });
    }

    const image = await Image.create({
      event,
      mediaType,
      url: `uploads/${req.file.filename}`,
    });

    res.status(201).json(image);
  } catch (error) {
    res.status(500).json({ message: "Could not create an image" });
  }
};

export const getImages = async (req: Request, res: Response) => {
  try {
    const event = req.query.event as string | undefined;
    const reqImages = event ? { event } : {};
    const images = await Image.find(reqImages);
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch images" });
  }
};

export const deleteImage = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const image = await Image.findById(id);
    if (!image) {
      return res.status(404).json("image not found");
    }

    const filePath = path.join(__dirname, "../", image.url);

    try {
      await fs.unlink(filePath);
    } catch (err: any) {
      if (err.code !== "ENOENT") {
        return res.status(500).json({ message: "failed to delete the image" });
      }
    }

    await Image.findByIdAndDelete(id);
    res.status(200).json("image deleted successfully");
  } catch (err) {
    res.status(500).json({ msg: "could not delete the image" });
  }
};
