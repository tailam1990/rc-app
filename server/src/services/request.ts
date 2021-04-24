import fetch from 'node-fetch';
import { API_KEY } from '../config';

const defaultHeaders = {
    'app-id': API_KEY,
};

export function get<T>(url: string, options: any = {}): Promise<T> {
    return fetch(url, {
        method: 'get',
        headers: {
            ...(options.headers || {}),
            ...defaultHeaders,
        },
        ...options,
    }).then((res) => handleResponse<T>(res));
}

function handleResponse<T>(res: Response): Promise<T> {
    if (res.ok) {
        return res.json();
    }
    throw Error('Fetch error');
}