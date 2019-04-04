export default {
    getItem(key) {
        let item = localStorage.getItem(key);
        try {
            item = item ? JSON.parse(item) : null;
        } catch (e) {
            item = null;
            console.log('e :', e);
        }
        return item;
    },
    setItem(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    removeItem(key) {
        localStorage.removeItem(key);
    },
    clearItem() {
        localStorage.clear();
    }
}
