import request from 'supertest'
import { baseUrl } from '../../../data/config.js'
import { expect } from 'chai'

export async function deleteProduct(token, id){
    const response = await request (baseUrl)
        .delete('/products/' + id)
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
    
    const product = (await response)
    return product
}