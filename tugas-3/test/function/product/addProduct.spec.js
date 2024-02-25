import request from 'supertest'
import { baseUrl } from '../../../data/config.js'
import { expect } from 'chai'
import productData from '../../../data/product.json' assert { type: 'json' };

export async function addProduct(token){
    const response = await request (baseUrl)
        .post('/products')
        .send(productData)
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
    
    const product = (await response)
    return product
}