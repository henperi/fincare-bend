import Sequelize from 'sequelize';

import model from '../models';
import response from '../helpers/responses';

const {
  Customer, FinAccount, AccountType, Transaction,
} = model;
const { Op } = Sequelize;
/**
 * Controller to handle neccessary staffActions
 */
class TransactionsController {
  /**
   * Method to create/record transaction on a fincare account
   * @param {object} req with Request Object
   * @param {object} res Response Object
   * @return {object} JSON response
   */
  static async createTransaction(req, res) {
    const {
      accountNumber, transactionType, amount, referenceNo, description,
    } = req.body;

    const { customerId } = req.params;
    const { id } = res.locals.user;

    try {
      const findFinAccount = () => FinAccount.findOne({
        where: {
          [Op.or]: [{ accountNumber }],
        },
        include: [{ model: AccountType, as: 'AccountType' }],
      }).catch((error) => {
        throw new Error(error);
      });

      const findCustomer = () => Customer.findOne({
        where: {
          [Op.or]: [{ id: customerId }],
        },
      }).catch((error) => {
        throw new Error(error);
      });

      const [finAccount, customer] = await Promise.all([findFinAccount(), findCustomer()]);

      if (!finAccount) {
        return response.notFound(res, {
          message: 'This account number does not exist',
        });
      }

      if (!customer) {
        return response.notFound(res, {
          message: "The customer you're attempting to transact for does not exist",
        });
      }

      if (finAccount.customerId !== customer.id && finAccount.customerId !== customerId) {
        return response.badRequest(res, {
          message: 'This account number does not belong to this customer',
        });
      }

      const availableBalance = finAccount.ledgerBalance - finAccount.outstandingBalance;

      if (transactionType === 'Credit') {
        if (amount <= finAccount.AccountType.minimumBalance) {
          return response.badRequest(res, {
            message: `The minimum allowed deposit on this account type is ${
              finAccount.AccountType.minimumBalance
            }`,
          });
        }
      }

      if (transactionType === 'Debit') {
        if (amount > availableBalance) {
          return response.badRequest(res, {
            message: `Unable to debit ${amount} on this account. Current available balance is ${availableBalance}`,
            availableBalance,
          });
        }

        if (availableBalance - amount < finAccount.AccountType.minimumBalance) {
          return response.badRequest(res, {
            message: `Unable to debit ${amount} on this account. Minimum required balance for this account after a debit should be ${
              finAccount.AccountType.minimumBalance
            }`,
            availableBalance,
          });
        }
      }

      const recordedTransaction = await Transaction.create({
        type: transactionType,
        referenceNo,
        accountNumber,
        amount,
        description,
        customerId,
        staffId: id,
      });

      let updatedAccount = {};
      if (recordedTransaction) {
        if (transactionType === 'Credit') {
          updatedAccount = await finAccount.update({
            ledgerBalance: Number(finAccount.ledgerBalance) + Number(amount),
            returning: true,
          });
        }
        if (transactionType === 'Debit') {
          updatedAccount = await finAccount.update({
            ledgerBalance: Number(finAccount.ledgerBalance) - Number(amount),
            returning: true,
          });
        }
      }

      const message = `${transactionType} Transaction of ${amount} has been completed successfully on ${accountNumber}`;

      return response.created(res, {
        message,
        recordedTransaction,
        newBalance: updatedAccount.ledgerBalance,
      });
    } catch (error) {
      return response.internalError(res, { error });
    }
  }
}

export default TransactionsController;
