
export function get(url, options = {}) {
    return fetch(url, {
        method: 'get',
        ...(options || {}),
    }).then(handleResponse);
}

export function del(url, options = {}) {
    return fetch(url, {
        method: 'delete',
        ...(options || {}),
    }).then(handleResponse);
}

function handleResponse(res) {
    if (res.ok) {
        return res.json();
    }
    throw Error(res.status || 'Unknown error occurred');
}
