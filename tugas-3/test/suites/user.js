import { createToken } from "../function/createToken.spec.js"
import { addUser } from "../function/user/addUser.spec.js"
import { deleteUser } from "../function/user/deleteUser.spec.js"
import { getUser } from "../function/user/getUser.spec.js"
import { updateUser } from "../function/user/updateUser.spec.js"
import { expect } from 'chai'
import userData from '../../data/user.json' assert { type: 'json' };
import userDataUpdate from '../../data/userUpdate.json' assert { type: 'json' };

describe('End to End - User', () => {
    let token
    let response
    let userId

    describe('Success Add User', () => {
        it('Status code is 201', async () => {
            token = await createToken()
            response =  await addUser(token)
            userId = (await response).body.data.userId
            expect((await response).status).to.equal(201)
            
        })

        it('Verify response message equal User berhasil ditambahkan', async () => {
            expect((await response).body.message).to.equal('User berhasil ditambahkan')
        })
    })

    describe('Success Get User', () => {
        it('Status code is 200', async () => {
            response = await getUser(token, userId)
            expect((await response).status).to.equal(200)
        })
        
        it('Success Get User', async () => {
            expect((await response).body.data.user.name).to.equal(userData.name)
        })
    })

    describe('Success Update User', () => {
        it('Status code is 200', async () =>{
            response = await updateUser(token, userId)
            expect((await response).status).to.equal(200)
        })       

        it('Verify response message equal User berhasil diupdate', async () => {
            expect((await response).body.message).to.equal('User berhasil diupdate')
        })

        it('Verify response name equal ' + userDataUpdate.name, async () => {
            expect((await response).body.data.name).to.equal(userDataUpdate.name)
        })
    })

    describe('Success Delete User', () => {
        it('Status code is 200', async () => {
            response = await deleteUser(token, userId)
            expect((await response).status).to.equal(200)
        })
        
        it('Verify repsonse message equal User berhasil dihapus', async () => {
            expect((await response).body.message).to.equal('User berhasil dihapus')
        })
    })
})