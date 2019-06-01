import { range } from 'lodash';
import moment from 'moment';
import model from '../models';

const { Repayment } = model;

/**

/**
 * Controller to handle neccessary staffActions
 */
class RepaymentRepo {
  /**
   * Method to create one/multiple repayments on an approvedLoan
   * @param {array} approvedloan
   * @param {object} transaction
   * @param {object} totalPaybackAmount
   * @param {object} numberOfPayments

   * @return {object} JSON response
   */
  static createRepayments(approvedloan, transaction, totalPaybackAmount, numberOfPayments) {
    const {
      LoanType: { payCycle },
    } = approvedloan;

    const descriptionType = payCycle === 'Monthly' ? 'month' : 'week';
    const averagePay = totalPaybackAmount / numberOfPayments;
    const incrementalDays = payCycle === 'Monthly' ? 28 : 7;
    const repaymentsArray = [];

    range(numberOfPayments).map((number) => {
      const oneDay = 86400000; // in milliseconds
      const currentTime = new Date().getTime(); // in milliseconds
      const timeline = incrementalDays * (number + 1) * oneDay; // in milliseconds

      return repaymentsArray.push({
        paymentStatus: false,
        dueAmount: averagePay,
        loanId: approvedloan.id,
        description: `${descriptionType} ${number + 1}`,
        dueDate: moment(currentTime + timeline).format('dddd, MMMM DD, YYYY hh:mm:ssA'),
      });
    });

    return Repayment.bulkCreate(repaymentsArray, { transaction }).catch((error) => {
      throw new Error(error);
    });
  }
}

export default RepaymentRepo;
