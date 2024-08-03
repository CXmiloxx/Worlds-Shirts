import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: 'dkokax0rl',
    api_key: '682578542549896',
    api_secret: 'X7OOgkHvzQqdo1SlEcalTUuBGB4',
});

export const uploader = cloudinary.uploader;
