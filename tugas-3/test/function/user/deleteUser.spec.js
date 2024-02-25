import request from 'supertest'
import { baseUrl } from '../../../data/config.js'

export async function deleteUser(token, id){
    const response = await request (baseUrl)
        .delete('/users/' + id)
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
    
    const user = (await response)
    return user
}