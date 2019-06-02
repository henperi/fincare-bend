import Sequelize from 'sequelize';

import model from '../models';

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
   * @return {object} JSON response
   */
  static getAll(applyPagination) {
    return Customer.findAndCountAll({
      ...applyPagination(),
      where: { isDeleted: false },
      include: [{ model: FinAccount, as: 'FinAccounts' }],
    }).catch((error) => {
      throw new Error(error);
    });
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
