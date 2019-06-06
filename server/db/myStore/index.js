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
    // store the stringified version in redis
    const stringifiedValue = JSON.stringify(await value);
    // store the parsed version in the local store
    store[key] = JSON.parse(stringifiedValue);

    const timeInMinutes = time * 60; // force the time sent above to minutes

    if (key && store[key]) {
      redisClient.set(key, stringifiedValue, 'EX', timeInMinutes, (error) => {
        if (error) {
          console.log(`REDIS ERORR::: setting======>${key}`, error);
        }
      });
    }
    // Remove it from the local store in 1/3 the time it stays in redis
    return myStore.expireIn(key, timeInMinutes / 3);
  },

  /**
   * @description get a store item by its key
   *
   * @param {string} key
   * @return {any} value
   */
  get: key => new Promise((resolve) => {
    if (store[key]) {
      // console.log('\n From Store[key] \n');
      return resolve(store[key]);
    }
    return redisClient.get(key, (error, result) => {
      if (result) {
        // console.log('\n From Redis \n');
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
   * @description Given a key, remove an item from the store after a given timeline
   *
   * @param {any} key
   * @param {integer} time
   * @return {void}
   */
  expireIn: (key, time = 30) => {
    // redisClient.expire(key, time * 60);

    setTimeout(() => {
      delete store[key];
    }, time * 1000);
  },
};

export default myStore;
