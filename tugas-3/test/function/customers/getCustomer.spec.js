import request from 'supertest'
import { baseUrl } from '../../../data/config.js'

export async function getCustomer(token, id){
    const response = await request (baseUrl)
        .get('/customers/' + id)
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
    
    const customer = (await response)
    return customer
}