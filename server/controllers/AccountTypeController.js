import response from '../helpers/responses';
import AccountTypeRepo from '../repository/AccountTypeRepo';

/**
 * Controller to handle neccessary staffActions
 */
class AccountTypeController {
  /**
   * Method to fetch all customers
   * @param {object} req
   * @param {object} res
   * @return {object} JSON response
   */
  static async fetchAllAccountTypes(req, res) {
    try {
      const accountTypes = await AccountTypeRepo.getAll();

      const message = 'Array of 0 or more accountTypes has been fetched successfully';

      return response.success(res, { message, accountTypes });
    } catch (error) {
      return response.internalError(res, { error });
    }
  }
}

export default AccountTypeController;
