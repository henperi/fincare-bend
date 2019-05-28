import Sequelize from 'sequelize';

import model from '../models';

const { Loan } = model;
const { Op } = Sequelize;
/**

/**
 * Controller to handle neccessary staffActions
 */
class LoanRepo {
  /**
   * Method to get a loan by the loanRefNo
   * @param {string} loanRefNo with Request Object
   * @return {object} LoanType
   */
  static getByLoanRefNo(loanRefNo) {
    return Loan.findOne({
      where: {
        [Op.or]: [{ loanRefNo }],
      },
    }).catch((error) => {
      throw new Error(error);
    });
  }
}

export default LoanRepo;
