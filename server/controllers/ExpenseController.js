import response from '../helpers/responses';
import ExpenseRepo from '../repository/ExpenseRepo';

/**
 * Controller to handle neccessary expense actions
 */
class ExpenseController {
  /**
   * Method to fetch all expenses
   * @param {object} req
   * @param {object} res
   * @return {object} JSON response
   */
  static async fetchAllExpenses(req, res) {
    const { paginationData } = res.locals;
    try {
      const { count, rows: expenses, cache } = await ExpenseRepo.getAll(null, res);

      const message = 'Array of 0 or more expenses has been fetched successfully';
      const metaData = { count, ...paginationData };

      return response.success(res, {
        message,
        expenses,
        metaData,
        cache,
      });
    } catch (error) {
      return response.internalError(res, { error });
    }
  }

  /**
   * Method to create a new expense
   * @param {object} req Request object containing the staff data
   * @param {object} res Response object
   * @return {object} JSON response
   */
  static async create(req, res) {
    try {
      const newExpense = await ExpenseRepo.create(req.body);

      const message = 'Expense created successfully';

      return response.created(res, { message, newExpense });
    } catch (errors) {
      return response.internalError(res, { errors });
    }
  }
}

export default ExpenseController;
