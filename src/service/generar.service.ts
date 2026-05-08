import  jwt  from "jsonwebtoken";

export const generarToken = (payload: object)=>{
    return jwt.sign(
        payload,
        process.env.JWT_SECRET as string,
        {
            expiresIn: "1d"
        }
    )
}