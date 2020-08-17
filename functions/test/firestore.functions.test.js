const test = require('firebase-functions-test')();
const firestoreFunctions = require('../index');


describe('Firestore functions test', ()=>{
    afterAll(()=>{
        test.cleanup();
    })
    it('test init user function', async ()=>{
        const wrapped = test.wrap(firestoreFunctions.initUser);

        const userData = {
            id:'testId',
            displayName:'test name',
            email:'fake@gmail.com',
        }

        const result = await wrapped(userData);
        return expect(result).toBeTruthy();
    })
})