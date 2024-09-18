// services/s3.js
import AWS from 'aws-sdk';
const s3 = new AWS.S3();

export const uploadFile = async (file) => {
  const uploadParams = {
    Bucket:process.env.AWS_BUCKET_NAME, // Replace with your S3 bucket name
    Key: `${Date.now()}-${file.originalname}`, // Unique file name
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    const result = await s3.upload(uploadParams).promise();
    console.log("File uploaded successfully:", result);
    return result; // Make sure to return the entire result
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

// import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
// import fs from 'fs';

// const s3 = new S3Client({ region:process.env.AWS_REGION});

// export const uploadFile = async (file) => {
//   try {
//     const uploadParams = {
//       Bucket: process.env.AWS_BUCKET_NAME,
//       Key: `uploads/${file.originalname}`, // Define your file path and name
//       Body: file.buffer, // Using file buffer provided by multer
//       ContentType: file.mimetype,
//     };

//     // Upload file to S3
//     const result = await s3.send(new PutObjectCommand(uploadParams));
//     return result;
//   } catch (err) {
//     console.log('Error uploading file', err);
//     throw err;
//   }
// };
