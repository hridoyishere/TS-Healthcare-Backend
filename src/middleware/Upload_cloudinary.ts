import { v2 as cloudinary } from "cloudinary";

export const streamUpload = (file: { buffer: any }, username: any) => {
  return new Promise((resolve, reject) => {
    if (!file || !file.buffer) {
      return reject(new Error("No file buffer provided"));
    }
    const stream = cloudinary.uploader.upload_stream(
      { folder: username },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      },
    );
    stream.end(file.buffer);
  });
};
