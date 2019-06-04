import Sequelize from 'sequelize';

import model from '../models';
import RepaymentRepo from './RepaymentsRepo';
import myStore from '../db/myStore';

const {
  Loan, LoanGaurantor, LoanType, Customer, sequelize,
} = model;
const { Op } = Sequelize;
/**

/**
 * Controller to handle neccessary staffActions
 */
class LoanRepo {
  /**
   * Method to get all loans
   * @param {func} applyPagination
   * @param {string} key
   * @return {array} Array of loans
   */
  static async getAll(applyPagination, key = '') {
    const cachedData = key && (await myStore.get(key));
    if (cachedData) {
      return { ...cachedData, cache: true };
    }

    const loans = Loan.findAndCountAll({
      ...applyPagination(),
      include: [{ model: LoanType, as: 'LoanType' }, { model: Customer, as: 'Customer' }],
    }).catch((error) => {
      throw new Error(error);
    });

    myStore.save(key, loans);
    return loans;
  }

  /**
   * Method to get a loan by the id
   * @param {string} id
   * @return {object} LoanType
   */
  static async getById(id) {
    return Loan.findOne({
      where: {
        [Op.or]: [{ id }],
      },
      include: [{ model: LoanType, as: 'LoanType' }, { model: Customer, as: 'Customer' }],
    }).catch((error) => {
      throw new Error(error);
    });
  }

  /**
   * Method to get a loan by the loanRefNo
   * @param {string} loanRefNo
   * @param {string} key
   * @return {object} LoanType
   */
  static async getByLoanRefNo(loanRefNo) {
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
   * @param {object} loanDetails
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
    ).catch((error) => {
      throw new Error(error);
    });
  }

  /**
   * Method to approve a loan
   * @param {object} loan
   * @param {number} approvedAmount
   * @return {object} repamentData
   */
  static async approveLoan(loan, approvedAmount) {
    const {
      duration,
      LoanType: { interestRate, payCycle },
    } = loan;

    const durationCount = duration[0];
    const payCycleCount = payCycle === 'Monthly' ? 1 : 4;
    const numberOfPayments = Number(durationCount) * Number(payCycleCount);

    const interest = approvedAmount * durationCount * (interestRate / 100);
    const totalPaybackAmount = Number(approvedAmount) + Number(interest);

    let transaction;
    try {
      transaction = await sequelize.transaction();

      const approvedLoan = await loan.update(
        { approvedAmount, approvalStatus: 'approved' },
        { transaction },
      );

      const repayments = await RepaymentRepo.createRepayments(
        approvedLoan,
        transaction,
        totalPaybackAmount,
        numberOfPayments,
      );

      await transaction.commit();

      return {
        approvedLoan,
        repayments,
        totalPaybackAmount,
        numberOfPayments,
      };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  /**
   * Method to reject a loan given the loan instance
   * @param {object} loan instance
   * @return {object} loan
   */
  static rejectLoan(loan) {
    return loan.update({ approvalStatus: 'rejected' }, { returning: true }).catch((error) => {
      throw new Error(error);
    });
  }
}

export default LoanRepo;
