import {
    CreateTripItem,
    InitFirebase,
    ClearAllApps,
    firebaseDatabase
} from './firebase.utils';

const currentUser = {
    uid:'testUser',
    email:'test@test.com',
    displayName:'test'
}

describe('Firebase utility test', ()=>{
    beforeAll(async ()=>{
        InitFirebase();
    })

    afterAll(async ()=>{
        return ClearAllApps();
    })

    it('Create a new trip', async ()=>{
        expect.assertions(1);

        return expect(CreateTripItem(currentUser, {
            tripName:'test trip',
            startDate:'04/Oct/2019',
            createDate:'04/Nov/2018',
        }))
        .resolves
        .toEqual(currentUser.uid);
    });
});