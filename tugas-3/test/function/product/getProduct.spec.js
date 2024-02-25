import request from 'supertest'
import { baseUrl } from '../../../data/config.js'

export async function getProduct(token, id){
    const response = await request (baseUrl)
        .get('/products/' + id)
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
    
    const product = (await response)
    return product
}