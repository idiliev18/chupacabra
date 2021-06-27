/**
 * reads from localStorage
 * @param {string} key
 * @returns {object}
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
 * writes to localStorage
 * @param {string} key
 * @param {object} data
 */
function writeToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

/**
 * deletes from localStorage
 * @param {string} key
 */
function deleteFromLocalStorage(key) {
    localStorage.removeItem(key);
}

export {
    readFromLocalStorage as readStorage,
    writeToLocalStorage as writeStorage,
    deleteFromLocalStorage as deleteStorage,
};
