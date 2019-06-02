const store = {};

/**
 *
 * @param {string} key
 * @param {integer} time in minutes
 * @return {void}
 */
const reset = (key, time = 5) => setTimeout(() => {
  store[key] = undefined;
}, time * 1000 * 60);

const myStore = {
  /**
   *@description get a store item by its key
   *
   * @param {string} key
   * @return {any} value
   */
  get: key => store[key],

  /**
   *@description get all store items
   *
   * @return {any} everything in the store
   */
  getAll: () => store,

  /**
   *@description save an item into the store with a key
   *
   * @param {string} key
   * @param {any} value
   * @param {integer} time(minutes): default 30mins
   * @return {void} void
   */
  save: async (key, value, time) => {
    store[key] = await value;

    return reset(key, time);
  },

  /**
   *@description remove an item from the store by its key
   *
   * @param {any} key
   * @return {void}
   */
  remove: (key) => {
    store[key] = undefined;
  },
};

export default myStore;
