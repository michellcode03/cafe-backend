import multer from "multer";
import path from 'path'
import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'

// Configuracion de Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// Guardamos en Cloudinary en vez de disco
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'cafe/productos',
        allowed_formats: ['jpeg', 'jpg', 'png', 'gif', 'webp'],
    } as any
})

const fileFilter = (req: any, file: any, cb: any) => {
    const allowedExtensions = /jpeg|jpg|png|gif|webp/
    const extname = allowedExtensions.test(
        path.extname(file.originalname).toLowerCase()
    )
    const mimetype = allowedExtensions.test(file.mimetype)

    if (mimetype && extname) {
        cb(null, true)
    } else {
        cb(new Error('Solo se permiten imágenes'))
    }
}

export const uploadProductImage = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }
})