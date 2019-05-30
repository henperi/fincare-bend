import Sequelize from 'sequelize';

import model from '../models';

const { Loan, LoanGaurantor, LoanType } = model;
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
      include: [{ model: LoanType, as: 'LoanType' }],
    }).catch((error) => {
      throw new Error(error);
    });
  }

  /**
   * Method to create a loan and include gaurantors
   * @param {object} loanDetails with Request Object
   * @return {object} LoanType
   */
  static createLoan(loanDetails) {
    const {
      loanRefNo,
      requestAmount,
      purpose,
      accountNumber,
      customerId,
      staffId,
      loanTypeId,
      gaurantorsArray,
      duration,
    } = loanDetails;

    return Loan.create(
      {
        loanRefNo,
        duration,
        purpose,
        accountNumber,
        customerId,
        staffId,
        loanTypeId,
        requestAmount: Number(requestAmount),
        Gaurantors: [...gaurantorsArray],
      },
      {
        include: [{ model: LoanGaurantor, as: 'Gaurantors' }],
      },
    );
  }
}

export default LoanRepo;
