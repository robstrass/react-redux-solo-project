import Cookies from 'js-cookie';

// this func allows fetch requests other than GETs to happen (by setting XSRF-TOKEN)
export async function csrfFetch(url, options = {}) {
    // defaults to GET method if no method exists
    options.method = options.method || 'GET';
    options.headers = options.headers || {};

    if (options.method.toUpperCase() !== 'GET') {
        options.headers['Content-Type'] =
            options.headers['Content-Type'] || 'application/json';
        options.headers['XSRF-TOKEN'] = Cookies.get('XSRF-TOKEN');
    }

    const res = await window.fetch(url, options);

    if (res.status >= 400) throw res;

    return res;
}

// gets XSRF token, only for dev
export function restoreCSRF() {
    return csrfFetch('/api/csrf/restore');
}
