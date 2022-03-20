export function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (err) {
        localStorage.removeItem(key);
    }
}

export function loadFromLocalStorage(key) {
    try {
        const data = localStorage.getItem(key);
        if (!data) {
            return undefined;
        }
        return JSON.parse(data);
    } catch (err) {
        return undefined;
    }
}

export function removeFromLocalStorage(key) {
    localStorage.removeItem(key);
}
