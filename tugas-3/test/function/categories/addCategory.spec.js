import { expect } from 'chai'
import request from 'supertest'
import { baseUrl } from '../../../data/config.js'
import categoryData from '../../../data/category.json' assert { type: 'json' };

export async function addCategory(token){
    const response = await request (baseUrl)
        .post('/categories')
        .send(categoryData)
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
    
    const category = (await response)
    return category
}