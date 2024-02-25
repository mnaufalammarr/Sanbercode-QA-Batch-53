import { createToken } from "../function/createToken.spec.js"
import { addProduct } from "../function/product/addProduct.spec.js"
import { deleteProduct } from "../function/product/deleteProduct.spec.js"
import { getProduct } from "../function/product/getProduct.spec.js"
import { updateProduct } from "../function/product/updateProduct.spec.js"
import { expect } from "chai"
import productData from '../../data/product.json' assert { type: 'json' };
import productDataUpdate from '../../data/productUpdate.json' assert { type: 'json' };

describe('End to End - Product', () => {
    let token
    let response
    let productId

    describe('Success Add Product', async () => { 
        it('Status code is 201', async () => {
            token = await createToken()
            response =  await addProduct(token)
            productId = (await response).body.data.productId
            expect((await response).status).to.equal(201)
        })
    })

    describe('Success Get Product', async () => { 
        it('Status code is 200', async () => {
            response = await getProduct(token, productId)
            expect((await response).status).to.equal(200)
        })

        it('Verify name product is equal ' + productData.name, async () => {
            expect((await response).body.data.product.name).to.equal(productData.name)
        })
    })

    describe('Success Update Product', async () => { 
        it('Status code is 200', async () => {
            response = await updateProduct(token, productId)
            expect((await response).status).to.equal(200)
        })

        it('Verify response message equal Product berhasil diupdate', async () =>{
            expect((await response).body.message).to.equal('Product berhasil diupdate')
        })
        
        it('Verify response product name equal ' + productDataUpdate.name, async () =>{
            expect((await response).body.data.name).to.equal(productDataUpdate.name)
        })      
    })

    describe('Success Delete Product', async () => {
        it('Status code is 200', async () => {
            response = await deleteProduct(token, productId)
            expect((await response).status).to.equal(200)
        })

        it('Verify response message equal Product berhasil dihapus', async () => {
            expect((await response).body.message).to.equal('Product berhasil dihapus')
        })      
    })
})