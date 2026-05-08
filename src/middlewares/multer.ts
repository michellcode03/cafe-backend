import multer from "multer";
import path from 'path'


//manda la direccion donde se guarda las imagenes
const direccion = multer.diskStorage({
    destination:(req, file, cb)=>{
       cb(null, 'uploads/producto/')
    },

    //guarda los datos de la imagen
    filename:(req, file, cb) =>{
        //definimos el nombre del archivo es decir el nombre que contenera
        //la imagen, tiene que ser unico, por eso aleatorio
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)//90909
        //crea un valor unico basado en la fecha y un numero aleatorio
        //aqui le mandamos la imagen, ya con el nombre y fecha y identificador unico
        const ext = path.extname(file.originalname)//PNG el tipo de imagen que se le envia

        //le mando como se llamara la imagen, producto-90909-9090.png // esto es un ejemplo
        cb(null, 'producto-' + uniqueSuffix + ext)
    }
})

//luego filtramos las imagenes
const fileFilter = (req: any, file: any, cb: any) => {
    const allowedExtensions = /jpeg|jpg|png|gif|webp/ //tipo de imagesn que se pueden recibir
    //define que tipo de imagenes estan permitidas
    const extname = allowedExtensions.test(
        path.extname(file.originalname).toLowerCase()
        // Si el archivo se llama "foto.PNG"
        // Devuelve: ".PNG"
    )
    const mimetype = allowedExtensions.test(file.mimetype)

    //funion que valida el archivo antes de guardarlo
    if (mimetype && extname) {
        cb(null, true)
    } else {
        cb(new Error('Solo se permiten imágenes'))
    }
}

export const uploadProductImage = multer({
    storage: direccion,
    fileFilter: fileFilter,
    //Se exporta el middleware configurado para ser usado en las rutas del backend
    //Limita el tamaño máximo del archivo a 5 MB para proteger el servidor.
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB
})