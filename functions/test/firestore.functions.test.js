const test = require('firebase-functions-test')();
const firestoreFunctions = require('../index');
const { delay } = require('redux-saga/effects');


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
            await new Promise(res=>{
                const timer = setTimeout(()=>{
                    res(clearTimeout(timer));
                }, 200);
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
        }, 6000)
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

    describe('create itinerary', ()=>{
        it('test create itinerary function', async ()=>{
            let wrapped = test.wrap(firestoreFunctions.createTripArchive);
            const result = await wrapped({
                userId: userData.id,
                name:'This has 1 itineray',
            });
            expect(result).toMatchObject({
                ownerId: userData.id,
            });

            const startDate = new Date();
            const endDate = new Date();
            endDate.setDate(endDate.getDate()+5);
            console.log(startDate.toLocaleDateString(), endDate.toLocaleDateString());
            wrapped = test.wrap(firestoreFunctions.createItineraryForTripArchive);
            const returnResut = await wrapped({
                tripArchiveId: result.id,
                name: 'first itinerary',
                startDate: startDate.toUTCString(),
                endDate: endDate.toUTCString(),
            });
            expect(returnResut).toBeTruthy();
            return expect(returnResut.tripArchiveId).toEqual(result.id);
        })
    })

    describe('update itinerary', ()=>{
        it('test update itinerary name and date function', async ()=>{
            let wrapped = test.wrap(firestoreFunctions.createTripArchive);
            const result = await wrapped({
                userId: userData.id,
                name:'itinerary name will be changed',
            });
            expect(result).toMatchObject({
                ownerId: userData.id,
            });

            const startDate = new Date();
            const endDate = new Date();
            endDate.setDate(endDate.getDate()+5);
            console.log(startDate.toLocaleDateString(), endDate.toLocaleDateString());
            wrapped = test.wrap(firestoreFunctions.createItineraryForTripArchive);
            const returnResut = await wrapped({
                tripArchiveId: result.id,
                name: 'You can not see this itinerary name',
                startDate: startDate.toUTCString(),
                endDate: endDate.toUTCString(),
            });
            expect(returnResut).toBeTruthy();
            expect(returnResut.tripArchiveId).toEqual(result.id);

            wrapped = test.wrap(firestoreFunctions.updateItinerary);
            const changedStartDate = new Date();
            const changedEndDate = new Date();
            changedEndDate.setDate(changedEndDate.getDate()+10);
            const newResult = await wrapped({
                userId: userData.id,
                tripArchiveId: returnResut.tripArchiveId,
                itineraryId: returnResut.id,
                dataToUpdate: {
                    name: 'name and date has been changed, total days changed from 6 to 11',
                    startDate: changedStartDate.toUTCString(),
                    endDate: changedEndDate.toUTCString(),
                }
            })
            return expect(newResult).toBeTruthy();
        })
    })

    describe('delete itinerary', ()=>{
        it('test delete itinerary function', async ()=>{
            let wrapped = test.wrap(firestoreFunctions.createTripArchive);
            const result = await wrapped({
                userId: userData.id,
                name:'itinerary was deleted',
            });
            expect(result).toMatchObject({
                ownerId: userData.id,
            });

            const startDate = new Date();
            const endDate = new Date();
            endDate.setDate(endDate.getDate()+5);
            console.log(startDate.toLocaleDateString(), endDate.toLocaleDateString());
            wrapped = test.wrap(firestoreFunctions.createItineraryForTripArchive);
            const returnResut = await wrapped({
                tripArchiveId: result.id,
                name: 'You see itinerary there is something went wrong',
                startDate: startDate.toUTCString(),
                endDate: endDate.toUTCString(),
            });
            expect(returnResut).toBeTruthy();
            expect(returnResut.tripArchiveId).toEqual(result.id);

            wrapped = test.wrap(firestoreFunctions.deleteItinerary);
            const deleteResult = await wrapped({
                userId: userData.id,
                tripArchiveId: returnResut.tripArchiveId,
                itineraryId: returnResut.id,
            });
            return expect(deleteResult).toBeTruthy();
        })
    })
})