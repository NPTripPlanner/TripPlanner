const test = require('firebase-functions-test')();
const firestoreFunctions = require('../index');


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

    describe('delete trip archive', ()=>{
        it('test delete trip archive function', async ()=>{
            let wrapped = test.wrap(firestoreFunctions.createTripArchive);
            const result = await wrapped({
                userId: userData.id,
                name:'a new trip to be deleted',
            });
            expect(result).toMatchObject({
                ownerId: userData.id,
            });
            wrapped = test.wrap(firestoreFunctions.deleteTripArchive);
            const deleteResult = await wrapped({
                userId: userData.id,
                tripArchiveId: result.id,
            });
            return expect(deleteResult).toBeTruthy();
        })
    })

    describe('update trip archive', ()=>{
        it('test update trip archive name function', async ()=>{
            let wrapped = test.wrap(firestoreFunctions.createTripArchive);
            const result = await wrapped({
                userId: userData.id,
                name:'name must be changed',
            });
            expect(result).toMatchObject({
                ownerId: userData.id,
            });
            wrapped = test.wrap(firestoreFunctions.updateTripArchiveName);
            const returnResut = await wrapped({
                userId: userData.id,
                tripArchiveId: result.id,
                name: 'Name has been changed'
            });
            return expect(returnResut).toBeTruthy();
        })
    })
})