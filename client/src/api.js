export const SERVER_ENDPOINT = "//localhost:4000";
export const API_ENDPOINT = SERVER_ENDPOINT + "/api";
export const RSS_ENDPOINT = SERVER_ENDPOINT + "/rss";

/**
 *
 * @param {object} data
 * @returns {string}
 */
function toURLEncoded(data) {
    return Object.keys(data)
        .map(
            (key) =>
                encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
        )
        .join("&");
}

/**
 * All requests in this function
 * are bound to /api
 *
 * @param {string} endpoint
 * @param {object} data
 * @param {string} method
 * @returns {Promise<any>}
 */
export async function fetchAPI(endpoint, data = {}, method = "GET") {
    return await fetch(API_ENDPOINT + endpoint, {
        method,
        mode: "cors",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: method === "GET" ? null : toURLEncoded(data),
    });
}

/**
 * All requests in this function
 * are bound to /rss
 *
 * @param {string} endpoint
 * @param {object} data
 * @param {string} method
 * @returns {Promise<any>}
 */
export async function fetchRSS(endpoint, data = {}, method = "GET") {
    return await fetch(RSS_ENDPOINT + endpoint, {
        method,
        mode: "cors",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: method === "GET" ? null : toURLEncoded(data),
    });
}
