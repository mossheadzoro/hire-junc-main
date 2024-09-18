import { Router } from "express";
import multer from 'multer';
import { uploadFile } from '../services/s3.js';
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import {
  addMessage,
  getMessages,
  getUnreadMessages,
  markAsRead,
} from "../controllers/MessageControllers.js";

const upload = multer(); // Initialize multer

export const messageRoutes = Router();

// messageRoutes.post("/add-message/:orderId", verifyToken, addMessage);
messageRoutes.get("/get-messages/:orderId", verifyToken, getMessages);
messageRoutes.get("/unread-messages", verifyToken, getUnreadMessages);
messageRoutes.put("/mark-as-read/:messageId", verifyToken, markAsRead);
messageRoutes.post('/add-message/:orderId', verifyToken, upload.single('file'), async (req, res) => {
  try {
    console.log("Entering");
    const file = req.file;
   console.log(file,"HEyyy")
    const { message, recipentId } = req.body;
   console.log("File",file);
   console.log("Recipent id",recipentId);
   console.log("Message",message);
    if (!recipentId || (!message && !file)) {
      return res.status(400).send('Missing required data.');
    }

    let fileUrl = null;
    if (file) {
      const result = await uploadFile(file); // Upload to S3
      fileUrl = result.Location; // Get file URL from S3
    }

    req.body.fileUrl = fileUrl;
    addMessage(req, res);
  } catch (err) {
    console.log(err);
    res.status(500).send('Error uploading file');
  }
});
