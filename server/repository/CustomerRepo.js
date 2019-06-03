import Sequelize from 'sequelize';

import model from '../models';
import myStore from '../db/myStore';

const { Customer, FinAccount } = model;
const { Op } = Sequelize;
/**

/**
 * Controller to handle neccessary staffActions
 */
class CustomerRepo {
  /**
   * Method to get all customers
   * @param {func} applyPagination
   * @param {string} key
   * @return {object} JSON response
   */
  static async getAll(applyPagination, key) {
    const cachedData = await myStore.get(key);

    if (cachedData) {
      return { ...cachedData, cache: true };
    }

    const customers = Customer.findAndCountAll({
      ...applyPagination(),
      where: { isDeleted: false },
      include: [{ model: FinAccount, as: 'FinAccounts' }],
    }).catch((error) => {
      throw new Error(error);
    });

    myStore.save(key, customers);
    return customers;
  }

  /**
   * Method to get a customer given the customer id
   * @param {string} id
   * @param {string} key
   * @return {object} JSON response
   */
  static async getById(id, key) {
    const cachedData = await myStore.get(key);

    if (cachedData) {
      return { ...cachedData, cache: true };
    }

    const customer = Customer.findOne({
      where: {
        [Op.or]: [{ id }],
      },
      include: [{ model: FinAccount, as: 'FinAccounts' }],
    }).catch((error) => {
      throw new Error(error);
    });

    myStore.save(key, customer);
    return customer;
  }

  /**
   * Method to delete a customer account by the customer id
   * @param {number} id with Request Object
   * @param {string} key with Request Object
   * @return {object} FinAccount
   */
  static deleteById(id, key) {
    myStore.remove(key);

    return Customer.update(
      { isDeleted: true },
      {
        where: {
          [Op.or]: [{ id }],
        },
        returning: true,
      },
    ).catch((error) => {
      throw new Error(error);
    });
  }
}

export default CustomerRepo;
