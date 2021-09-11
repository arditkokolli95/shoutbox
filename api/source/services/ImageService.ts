import upload from './fileUpload';
import express from 'express';
import fs from 'fs';
import { UploadedFile } from "express-fileupload";

const writeFiles= async(files: UploadedFile[]) => {
  const names = await Promise.all(files.map(async(file) => {
    const key = `shoutbox_${new Date().getTime()}_${file.name}`;
    await fs.writeFileSync(`${__dirname}/../../public/images/${key}`, file.data);
    return key;
  }))
  return names.join(';');
}

const uploadImages = async (files: UploadedFile[]): Promise<string> => {
  return writeFiles(files);
};

const ImageService = {
    uploadImages,
}

export default ImageService;