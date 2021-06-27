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
export async function fetchAPI(
    endpoint,
    data = {},
    headers = {},
    method = "GET"
) {
    let response = await fetch(API_ENDPOINT + endpoint, {
        method,
        mode: "cors",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            ...headers,
        },
        body: method === "GET" ? null : toURLEncoded(data),
    });
    return response.json();
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
export async function fetchRSS(
    endpoint,
    data = {},
    headers = {},
    method = "GET"
) {
    return (
        await fetch(RSS_ENDPOINT + endpoint, {
            method,
            mode: "cors",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                ...headers,
            },
            body: method === "GET" ? null : toURLEncoded(data),
        })
    ).json();
}

/**
 * fetches user
 * (bound to /users/@me)
 * @param {string} token
 * @returns {Promise<object>}
 */
export async function fetchUser(token) {
    return new Promise((res, rej) => {
        fetchAPI(
            "/users/@me",
            {},
            {
                Authorization: token,
            }
        )
            .then(res)
            .catch(rej);
    });
}

/**
 * validates token
 * @param {string} token
 * @returns {boolean}
 */
export async function validateToken(token) {
    try {
        let response = await fetchUser(token);
        if (response.type === "user-success") {
            return true;
        } else if (response.type === "user-failure") {
            return false;
        } else {
            return false;
        }
    } catch {
        return false;
    }
}

/**
 *
 * @param {File} file
 * @param {string} token
 */
export async function changeAvatar(file, token) {
    const formData = new FormData();

    formData.append("avatar", file);

    return await fetch(`${API_ENDPOINT}/users/@me/changeProfilePicture`, {
        method: "POST",
        body: formData,
    });
}
