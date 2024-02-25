import request from 'supertest'
import { expect } from 'chai'
import { baseUrl } from '../../../data/config.js'
import categoryDataUpdate from '../../../data/categoryUpdate.json' assert { type: 'json' };

export async function updateCategory(token, id){
    const response = await request (baseUrl)
        .put('/categories/' + id)
        .send(categoryDataUpdate)
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
    
    const category = (await response)
    return category
}