import Sequelize from 'sequelize';

import model from '../models';
import myStore from '../db/myStore';

const { FinAccount, AccountType, Customer } = model;
const { Op } = Sequelize;
/**

/**
 * Controller to handle neccessary staffActions
 */
class FinAccountRepo {
  /**
   * Method to get all finAccounts
   * @param {func} applyPagination
   * @param {string} key
   * @return {array} Array of loans
   */
  static async getAll(applyPagination, key) {
    const cachedData = await myStore.get(key);

    if (cachedData) {
      return { ...cachedData, cache: true };
    }

    const finAccounts = FinAccount.findAndCountAll({
      ...applyPagination(),
      include: [{ model: AccountType, as: 'AccountType' }, { model: Customer, as: 'Customer' }],
    }).catch((error) => {
      throw new Error(error);
    });

    myStore.save(key, finAccounts);
    return finAccounts;
  }

  /**
   * Method to get a fincare account by the accountNumber
   * @param {string} accountNumber
   * @param {string} key
   * @return {object} FinAccount
   */
  static async getByAccountNumber(accountNumber, key) {
    const cachedData = await myStore.get(key);

    if (cachedData) {
      return { ...cachedData, cache: true };
    }

    const finAccount = FinAccount.findOne({
      where: {
        [Op.or]: [{ accountNumber }],
      },
      include: [{ model: AccountType, as: 'AccountType' }],
    }).catch((error) => {
      throw new Error(error);
    });

    myStore.save(key, finAccount);
    return finAccount;
  }

  /**
   * Method to get a fincare account by the accountNumber
   * @param {string} customerId
   * @param {string} key
   * @return {object} FinAccount
   */
  static async getByCustomerId(customerId, key) {
    const cachedData = await myStore.get(key);

    if (cachedData) {
      return { ...cachedData, cache: true };
    }

    const finAccount = FinAccount.findAll({
      where: {
        [Op.or]: [{ customerId }],
      },
      include: [{ model: AccountType, as: 'AccountType' }],
    }).catch((error) => {
      throw new Error(error);
    });

    myStore.save(key, finAccount);
    return finAccount;
  }

  /**
   * Method to delete all fincare accounts by the customer
   * @param {string} customerId
   * @param {string} key
   * @return {object} FinAccount
   */
  static deleteByCustomerId(customerId, key) {
    myStore.remove(key);
    return FinAccount.update(
      { isDeleted: true },
      {
        where: {
          [Op.or]: [{ customerId }],
        },
        returning: true,
      },
    ).catch((error) => {
      throw new Error(error);
    });
  }
}

export default FinAccountRepo;
