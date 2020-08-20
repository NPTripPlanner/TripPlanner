const test = require('firebase-functions-test')();
const firestoreFunctions = require('../index');
const { user } = require('firebase-functions/lib/providers/auth');


describe('Firestore functions test', ()=>{

    const userData = {
        id:'testId',
        displayName:'test name',
        email:'fake@gmail.com',
    }

    afterAll(()=>{
        test.cleanup();
    })

    describe('init user', ()=>{
        it('test init user function', async ()=>{
            const wrapped = test.wrap(firestoreFunctions.initUser);
            const result = await wrapped(userData);
            return expect(result).toBeTruthy();
        })
    })
    
    describe('create trip archive', ()=>{
        it('test create trip function', async ()=>{
            const wrapped = test.wrap(firestoreFunctions.createTripArchive);
            const result1 = await wrapped({
                userId: userData.id,
                name:'a new trip 1',
            });
            expect(result1).toMatchObject({
                ownerId: userData.id,
            });
            const result2 = await wrapped({
                userId: userData.id,
                name:'a new trip 2',
            });
            return expect(result2).toMatchObject({
                ownerId: userData.id,
            });
        })
    })
})