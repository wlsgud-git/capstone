import jwt from "jsonwebtoken"
import { config } from "../config/env.config.js"

export async function createjwt (payload, type){
    try {
    let token = await jwt.sign(
                payload, 
                config.jwt.secret_key,
                { expiresIn: '1h' } 

            )

            return token
    }catch(err) {
       console.log(err)
    }
}