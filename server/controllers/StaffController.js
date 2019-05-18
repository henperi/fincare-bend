import Sequelize from 'sequelize';

import model from '../models';
import response from '../helpers/responses';

const { CustomerProfile, Customer } = model;
const { Op } = Sequelize;
/**
 * Controller to handle neccessary staffActions
 */
class StaffController {
  /**
   * Method to create a staff
   * @param {object} req with Customer data
   * @param {object} res Response to request
   * @return {object} JSON response
   */
  static async createCustomer(req, res) {
    const {
      firstName, lastName, otherNames, email, phone,
    } = req.body;
    const { id } = res.locals.user;

    try {
      const customer = await Customer.findOne({
        where: {
          [Op.or]: [{ email }, { phone }],
        },
      });

      if (customer && customer.email === email) {
        return response.alreadyExists(res, {
          message: 'A customer with this email already exist',
        });
      }
      if (customer && customer.phone === phone) {
        return response.alreadyExists(res, {
          message: 'A customer with this phone already exist',
        });
      }

      const newCustomer = await Customer.create({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        otherNames: (otherNames && otherNames.trim()) || '',
        email: email.trim(),
        phone: phone.trim(),
        accountOfficerId: id,
      });

      const message = 'new customer created successfully';

      return response.created(res, { message, newCustomer });
    } catch (error) {
      return response.internalError(res, { error });
    }
  }
}

export default StaffController;
