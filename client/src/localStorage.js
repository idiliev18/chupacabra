/**
 *
 * @param {string} key
 * @returns {string}
 */
function readFromLocalStorage(key) {
    if (!localStorage.getItem(key)) return null;
    else {
        try {
            return JSON.parse(localStorage.getItem(key));
        } catch {
            return localStorage.getItem(key);
        }
    }
}

/**
 *
 * @param {string} key
 * @param {string} data
 */
function writeToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

export {
    readFromLocalStorage as readStorage,
    writeToLocalStorage as writeStorage,
};
