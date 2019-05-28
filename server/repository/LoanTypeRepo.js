import Sequelize from 'sequelize';

import model from '../models';

const { LoanType } = model;
const { Op } = Sequelize;
/**

/**
 * Controller to handle neccessary staffActions
 */
class LoanTypeRepo {
  /**
   * Method to get a fincare account by the accountNumber
   * @param {string} loanTypeName with Request Object
   * @return {object} LoanType
   */
  static getByName(loanTypeName) {
    return LoanType.findOne({
      where: {
        [Op.or]: [{ name: loanTypeName }],
      },
    }).catch((error) => {
      throw new Error(error);
    });
  }
}

export default LoanTypeRepo;
