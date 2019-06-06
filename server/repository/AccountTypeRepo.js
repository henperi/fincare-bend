import model from '../models';
import myStore from '../db/myStore';

const { AccountType } = model;
/**

/**
 * Controller to handle neccessary staffActions
 */
class AccountTypeRepo {
  /**
   * Method to get all AccountTypes
   *
   * @param {string} key
   * @return {array} Array of loans
   */
  static async getAll(key = '') {
    const cachedData = key && (await myStore.get(key));
    if (cachedData) {
      return { ...cachedData, cache: true };
    }

    const accountType = AccountType.findAll({}).catch((error) => {
      throw new Error(error);
    });

    if (key) myStore.save(key, accountType);
    return accountType;
  }
}

export default AccountTypeRepo;
