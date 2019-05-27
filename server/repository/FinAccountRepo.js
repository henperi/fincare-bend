import Sequelize from 'sequelize';

import model from '../models';

const { FinAccount, AccountType } = model;
const { Op } = Sequelize;
/**

/**
 * Controller to handle neccessary staffActions
 */
class FinAccountRepo {
  /**
   * Method to get a fincare account by the accountNumber
   * @param {object} accountNumber with Request Object
   * @return {object} FinAccount
   */
  static getByAccountNumber(accountNumber) {
    return FinAccount.findOne({
      where: {
        [Op.or]: [{ accountNumber }],
      },
      include: [{ model: AccountType, as: 'AccountType' }],
    }).catch((error) => {
      throw new Error(error);
    });
  }

  /**
   * Method to get a fincare account by the accountNumber
   * @param {object} customerId with Request Object
   * @return {object} FinAccount
   */
  static getByCustomerId(customerId) {
    return FinAccount.findAll({
      where: {
        [Op.or]: [{ customerId }],
      },
      include: [{ model: AccountType, as: 'AccountType' }],
    }).catch((error) => {
      throw new Error(error);
    });
  }

  /**
   * Method to delete all fincare accounts by the customer
   * @param {object} customerId with Request Object
   * @return {object} FinAccount
   */
  static deleteByCustomerId(customerId) {
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
