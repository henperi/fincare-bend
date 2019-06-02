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
    if (myStore.get(key)) {
      return { ...myStore.get(key), cache: true };
    }

    const customer = Customer.findAndCountAll({
      ...applyPagination(),
      where: { isDeleted: false },
      include: [{ model: FinAccount, as: 'FinAccounts' }],
    }).catch((error) => {
      throw new Error(error);
    });

    myStore.save(key, customer);
    return customer;
  }

  /**
   * Method to get a customer given the customer id
   * @param {string} id
   * @return {object} JSON response
   */
  static getById(id) {
    return Customer.findOne({
      where: {
        [Op.or]: [{ id }],
      },
      include: [{ model: FinAccount, as: 'FinAccounts' }],
    }).catch((error) => {
      throw new Error(error);
    });
  }

  /**
   * Method to delete a customer account by the customer id
   * @param {object} id with Request Object
   * @return {object} FinAccount
   */
  static deleteById(id) {
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
