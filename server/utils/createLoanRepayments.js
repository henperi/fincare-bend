import moment from 'moment';
import { range } from 'lodash';
import model from '../models';

const { sequelize, Repayment } = model;

/**
 * Method to update a fincare accounts ledger balance
 * @param {object} loan
 * @param {number} approvedAmount
 * @return {object} repamentData
 */
const createLoanRepayments = async (loan, approvedAmount) => {
  const {
    duration,
    LoanType: { interestRate, payCycle },
  } = loan;

  const durationCount = duration[0];
  const payCycleCount = payCycle === 'Monthly' ? 1 : 4;
  const descriptionType = payCycle === 'Monthly' ? 'month' : 'week';
  const numberOfPayments = Number(durationCount) * Number(payCycleCount);

  const interest = approvedAmount * durationCount * (interestRate / 100);
  const totalPaybackAmount = Number(approvedAmount) + Number(interest);

  const averagePay = totalPaybackAmount / numberOfPayments;
  const incrementalDays = payCycle === 'Monthly' ? 28 : 7;
  const repaymentsArray = [];

  range(numberOfPayments).map(number => repaymentsArray.push({
    description: `${descriptionType} ${number + 1}`,
    dueDate: moment(new Date().getTime() + 86400000 * incrementalDays * (number + 1)).format(
      'dddd, MMMM DD, YYYY hh:mm:ssA',
    ),
    paymentStatus: false,
    dueAmount: averagePay,
    loanId: loan.id,
  }));

  let transaction;
  try {
    transaction = await sequelize.transaction();

    await loan.update({ approvedAmount, approvalStatus: 'approved' }, { transaction });
    const repayments = await Repayment.bulkCreate(repaymentsArray, { transaction });

    await transaction.commit();
    return { repayments, totalPaybackAmount, numberOfPayments };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export default createLoanRepayments;
