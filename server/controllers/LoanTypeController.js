import response from '../helpers/responses';
import LoanTypeRepo from '../repository/LoanTypeRepo';

/**
 * Controller to handle neccessary staffActions
 */
class LoanTypeController {
  /**
   * Method to fetch all customers
   * @param {object} req
   * @param {object} res
   * @return {object} JSON response
   */
  static async fetchAllLoanTypes(req, res) {
    try {
      const loanTypes = await LoanTypeRepo.getAll();

      const message = 'Array of 0 or more loanTypes has been fetched successfully';

      return response.success(res, { message, loanTypes });
    } catch (error) {
      return response.internalError(res, { error });
    }
  }
}

export default LoanTypeController;
