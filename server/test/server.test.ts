import { start, shutdown } from '../src/server';
import UserService from '../src/services/users';

const userIdsRemove: any[] = [];

describe('Server test', () => {
    it('Server start', (done) => {
        start().then(() => done());
    });

    it('Get users', (done) => {
        UserService.get(0, 50).then((users) => {
            expect(users.length).toBe(50);
            userIdsRemove.push(...users.filter((i) => i < Math.random() * 5).map((u) => u.id));
            done();
        });
    });

    it('Remove some users', (done) => {
        Promise.all(
            userIdsRemove.map((id) => UserService.remove(id))
        ).then(() => {
            expect(UserService.getRemoved()).toEqual(userIdsRemove);
            done();
        });
    });

    it('Get users after users are removed', (done) => {
        UserService.get(0, 50).then((users) => {
            expect(users.length).toBe(50 - userIdsRemove.length);
            done();
        });
    });

    afterAll((done) => {
        shutdown().then(() => done());
    });
});
