import Sequelize from 'sequelize';

import model from '../models';
import response from '../helpers/responses';
import FinAccountRepo from '../repository/FinAccountRepo';
import CustomerRepo from '../repository/CustomerRepo';

const { FinAccount, AccountType } = model;
const { Op } = Sequelize;
/**
 * Controller to handle neccessary staffActions
 */
class FinAccountController {
  /**
   * Method to create a customer's fincare account
   * @param {object} req with Request Object
   * @param {object} res Response Object
   * @return {object} JSON response
   */
  static async addFinAccount(req, res) {
    const { actType, contributionAmount, contributionFrequency } = req.body;

    const { customerId } = req.params;
    let accountNumber;

    try {
      const findAccountType = () => AccountType.findOne({
        where: {
          [Op.or]: [{ name: actType }],
        },
      }).catch((error) => {
        throw new Error(error);
      });

      const findCustomer = () => CustomerRepo.getById(customerId);

      const getMaxAccountNumber = () => FinAccount.max('accountNumber').catch((error) => {
        throw new Error(error);
      });

      const checkUserFinAccounts = () => FinAccount.findOne({
        where: {
          [Op.or]: [{ customerId, actType }],
        },
      }).catch((error) => {
        throw new Error(error);
      });

      const [accountType, customer, maxAccountNumber, existingFinAccount] = await Promise.all([
        findAccountType(),
        findCustomer(),
        getMaxAccountNumber(),
        checkUserFinAccounts(),
      ]);

      if (!accountType) {
        return response.notFound(res, {
          message: 'The account type name sent does not exist',
        });
      }

      if (!customer) {
        return response.notFound(res, {
          message:
            "The customer you're attempting to add a fincare financial account for does not exist",
        });
      }

      if (customer.isDeleted) {
        return response.notFound(res, {
          message:
            "The customer you're attempting to add a fincare financial account for has been deleted",
        });
      }

      if (existingFinAccount) {
        return response.alreadyExists(res, {
          message: `This customer already has a fincare ${actType} account.`,
        });
      }

      if (maxAccountNumber) {
        accountNumber = maxAccountNumber + 1;
      }

      const createdFinAccount = await FinAccount.create({
        actType,
        contributionAmount,
        contributionFrequency,
        customerId,
        accountNumber,
        actTypeId: accountType.id,
      });

      const message = 'Customer Financial Account has been created successfully';

      return response.created(res, { message, createdFinAccount });
    } catch (error) {
      return response.internalError(res, { error });
    }
  }

  /**
   * Method to fetch all finaccounts
   * @param {object} req with Request Object
   * @param {object} res Response Object
   * @return {object} JSON response
   */
  static async fetchAllFinAccounts(req, res) {
    const { applyPagination, paginationData } = res.locals;
    try {
      const { count, rows: allFinAccounts, cache } = await FinAccountRepo.getAll(
        applyPagination,
        req.originalUrl,
      );

      const message = 'Array of 0 or more finAccounts has been fetched successfully';
      const metaData = { count, ...paginationData };

      return response.success(res, {
        message,
        allFinAccounts,
        metaData,
        cache,
      });
    } catch (error) {
      return response.internalError(res, { error });
    }
  }

  /**
   * Method to fetch a finAccount by its accountNumber
   * @param {object} req with Request Object
   * @param {object} res Response Object
   * @return {object} JSON response
   */
  static async fetchByAccountNumber(req, res) {
    const { accountNumber } = req.params;
    try {
      const finAccount = await FinAccountRepo.getByAccountNumber(accountNumber);

      if (!finAccount) {
        return response.notFound(res, {
          message: 'There is no finAccount with such an accountNumber',
        });
      }

      const message = 'finAccount has been fetched successfully';

      return response.success(res, { message, finAccount });
    } catch (error) {
      return response.internalError(res, { error });
    }
  }
}

export default FinAccountController;
