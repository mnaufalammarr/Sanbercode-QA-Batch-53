import request from 'supertest'
import { baseUrl } from "../../data/config.js";

export async function createToken(){
    const payload = {
        "email": "admin@email.com",
        "password": "adminadmin"
    }
    
    const response = await request (baseUrl)
        .post('/authentications')
        .send(payload)
        .set('Content-Type', 'application/json')
    
    const token = (await response).body.data.accessToken
    return token
}