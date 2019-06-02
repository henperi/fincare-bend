import response from '../helpers/responses';
import CustomerRepo from '../repository/CustomerRepo';

/**
 * Controller to handle neccessary staffActions
 */
class CustomerController {
  /**
   * Method to fetch all customers
   * @param {object} req with Request Object
   * @param {object} res Response Object
   * @return {object} JSON response
   */
  static async fetchAllCustomers(req, res) {
    const { applyPagination, paginationData } = res.locals;
    try {
      const { count, rows: allCustomers } = await CustomerRepo.getAll(applyPagination);

      const message = 'Array of 0 or more customers has been fetched successfully';
      const metaData = { count, ...paginationData };

      return response.success(res, { message, allCustomers, metaData });
    } catch (error) {
      return response.internalError(res, { error });
    }
  }

  /**
   * Method to fetch a customer by the id
   * @param {object} req with Request Object
   * @param {object} res Response Object
   * @return {object} JSON response
   */
  static async fetchById(req, res) {
    const { customerId } = req.params;
    try {
      const customer = await CustomerRepo.getById(customerId);

      if (!customer) {
        return response.notFound(res, {
          message: 'There is no customer with such an id',
        });
      }

      const message = 'customer has been fetched successfully';

      return response.success(res, { message, customer });
    } catch (error) {
      return response.internalError(res, { error });
    }
  }
}

export default CustomerController;
