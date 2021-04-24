import { get, del } from './request';
import { API_URL } from '../config';

export function getUsers(limit = 50) {
    return get(`${API_URL}/users?limit=${limit}`);
}

export function removeUser(id) {
    if (!id) {
        throw Error('Missing id');
    }
    return del(`${API_URL}/users/${id}`);
}
