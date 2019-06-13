import response from '../helpers/responses';
import ExpenseRepo from '../repository/ExpenseRepo';

/**
 * Controller to handle neccessary staffActions
 */
class ExpenseController {
  /**
   * Method to fetch all expenses
   * @param {object} req
   * @param {object} res
   * @return {object} JSON response
   */
  static async fetchAllExpenses(req, res) {
    try {
      const expenses = await ExpenseRepo.getAll();

      const message = 'Array of 0 or more expenses has been fetched successfully';

      return response.success(res, { message, expenses });
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
    const {
      expenseTitle: title, amount, description, category,
    } = req.body;

    try {
      // const findExpense = () => ExpenseRepo.getByTitle();

      const newExpense = await ExpenseRepo.create({
        title,
        amount,
        description,
        category,
      });

      const message = 'Expense created successfully';

      return response.created(res, { message, newExpense });
    } catch (errors) {
      return response.internalError(res, { errors });
    }
  }
}

export default ExpenseController;
