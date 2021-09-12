import upload from './fileUpload';
import express from 'express';
import fs from 'fs';
import { UploadedFile } from "express-fileupload";

const writeFiles = async (files: UploadedFile[]) => {
  const names = await Promise.all(files.map(async (file) => {
    const key = `shoutbox_${new Date().getTime()}_${file.name}`;
    await fs.writeFileSync(`${__dirname}/../../public/images/${key}`, file.data);
    return key;
  }))
  return names.join(';');
}

const uploadImages = async (files: UploadedFile[]): Promise<string> => {
  return writeFiles(files);
};

const deleteImages = async (images: string) => {

  images.split(';').map((image) => {
    try {
      const filepath = `${__dirname}/../../public/images/${image}`;
      console.log('Fajll peth: ', filepath);
      fs.unlinkSync(filepath);
      //file removed
    } catch (err) {
      console.error(err);
    }
  })
};

const ImageService = {
  uploadImages,
  deleteImages
}

export default ImageService;