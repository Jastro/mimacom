const { SERVICE_HOST } = process.env;

const SERVICE_ENDPOINTS = {
    GROCERY: '/grocery',
};

/**
 * @return {Promise<Response>}
 */
export function getAllProducts() {
    return fetch(SERVICE_HOST + SERVICE_ENDPOINTS.GROCERY)
        .then((response) => response.json());
}

/**
 * @return {Promise<Response>}
 */
export function getFavoriteProducts() {
    return fetch(SERVICE_HOST + SERVICE_ENDPOINTS.GROCERY + '?favorite=1')
        .then((response) => response.json());
}

/**
 * @param {String} id
 * @param {String} favorite
 * @return {Promise<any>}
 */
export function setProductFavorite(id, favorite) {
    return fetch(SERVICE_HOST + SERVICE_ENDPOINTS.GROCERY + `/${id}`, {
        method: 'PATCH',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({
            favorite: favorite ? 1 : 0,
        }),
    })
        .then((response) => response.json());
}

/**
 * @param {String} id
 * @param {Number} stock
 * @return {Promise<any>}
 */
export function setProductStock(id, stock) {
    return fetch(SERVICE_HOST + SERVICE_ENDPOINTS.GROCERY + `/${id}`, {
        method: 'PATCH',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({
            stock,
        }),
    })
        .then((response) => response.json());
}
