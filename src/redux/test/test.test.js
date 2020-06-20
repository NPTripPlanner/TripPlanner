import store from '../Store';
import {setMessage} from './test.action';

describe('Redux test', ()=>{
    it('set message ', () => {
        store.dispatch(setMessage('hello it is redux'));
        expect(store.getState().test.message).toBe('hello it is redux');
    });
})