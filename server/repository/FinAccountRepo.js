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
}

export default FinAccountRepo;
