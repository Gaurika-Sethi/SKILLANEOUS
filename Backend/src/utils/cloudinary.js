import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';
import path from 'path';

let isConfigured = false;

const configureCloudinary = () => {
    if (isConfigured) return;
    cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
    isConfigured = true;
};



export const uploadToCloudinary= async (localFilePath) =>{
    try {
        if (!localFilePath){
            console.log('No file path provided for Cloudinary upload.');
            return null;
        }

        configureCloudinary();

        const absolutePath = path.resolve(localFilePath);
        console.log('Uploading file to Cloudinary from path:', absolutePath);

        const response = await cloudinary.uploader.upload(absolutePath, {
            resource_type: 'auto',
    });

    fs.unlinkSync(absolutePath);
    console.log('Cloudinary upload response:', response.url);
    return response;
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);

        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        throw error;
    }
}