import redisClient from './redisClient';

const store = {};

const myStore = {
  /**
   * @description save an item into the store with a key
   *
   * @param {string} key
   * @param {any} value
   * @param {number} time(minutes): default 30mins
   * @return {void} void
   */
  save: async (key, value, time = 30) => {
    store[key] = JSON.stringify(await value);

    const timeInMinutes = time * 60; // force the time sent above to minutes

    if (key && store[key]) {
      redisClient.set(key, store[key], 'EX', timeInMinutes, (error) => {
        if (error) {
          console.log(`REDIS ERORR::: setting======>${key}`, error);
        }
      });
    }
    return myStore.expireIn(key, timeInMinutes);
  },

  /**
   * @description get a store item by its key
   *
   * @param {string} key
   * @return {any} value
   */
  get: key => new Promise((resolve) => {
    if (store[key]) {
      return resolve(JSON.parse(store[key]));
    }
    return redisClient.get(key, (error, result) => {
      if (result) {
        return resolve(JSON.parse(result));
      }
      console.log(`REDIS ERROR:::GETTING=====>${key}`, error);
      // return reject(new Error(`error getting ${key} from redis`));
      return resolve(false);
    });
  }),

  /**
   * @description check if a key exists in the store
   *
   * @param {string} key
   * @return {any} value
   */
  exists: key => new Promise(resolve => redisClient.exists(key, (error, result) => {
    if (result === 1) {
      return resolve(true);
    }
    return resolve(false);
  })),

  /**
   * @description remove an item from the store by its key
   *
   * @param {any} key
   * @return {void}
   */
  remove: (key) => {
    delete store[key];
    redisClient.del(key);
  },

  /**
   * @description Given a key, remove an item from the store at a given timeline
   *
   * @param {any} key
   * @param {integer} time
   * @return {void}
   */
  expireIn: (key, time = 30) => {
    // redisClient.expire(key, time * 60);

    setTimeout(() => {
      // Remove it from the local store in 1/3 the time it stays in redis
      delete store[key];
    }, (time / 3) * 1000);
  },
};

export default myStore;
