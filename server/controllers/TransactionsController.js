import model from '../models';
import response from '../helpers/responses';
import FinAccountRepo from '../repository/FinAccountRepo';
import CustomerRepo from '../repository/CustomerRepo';
import calcAvailableBalance from '../utils/calcAvailableBalance';
import updateLedgerBalance from '../utils/updateLedgerBalance';

const { Transaction } = model;

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
      const findFinAccount = () => FinAccountRepo.getByAccountNumber(accountNumber);
      const findCustomer = () => CustomerRepo.getById(customerId);

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

      const availableBalance = calcAvailableBalance(finAccount);

      if (transactionType === 'Credit') {
        if (amount < finAccount.AccountType.minimumBalance) {
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
        updatedAccount = await updateLedgerBalance(transactionType, finAccount, amount);
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
