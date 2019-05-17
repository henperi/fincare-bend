import Sequelize from 'sequelize';

import model from '../models';
import response from '../helpers/responses';
import { hashPassword } from '../helpers/passwordHelpers';
import generateStaffId from '../helpers/generateStaffId';

const { AccountType, Staff, StaffProfile } = model;
const { Op } = Sequelize;
/**
 * Controller to handle neccessary staffActions
 */
class SuperAdminController {
  /**
   * Method to create a new staff with the staff profile
   * @param {object} req Request object containing the staff data
   * @param {object} res Response object
   * @return {object} JSON response
   */
  static async createStaff(req, res) {
    const {
      email, phone, password, firstName, lastName, staffLevel,
    } = req.body;

    try {
      const staff = await Staff.findOne({
        where: {
          [Op.or]: [{ email: email.trim() }],
        },
        include: { model: StaffProfile, as: 'Profile' },
      });

      if (staff) {
        return response.alreadyExists(res, { message: 'This email has already been used' });
      }

      const hashedPassword = hashPassword(password.trim());
      const newStaff = await Staff.create(
        {
          email: email.trim(),
          uniqueId: generateStaffId(),
          password: hashedPassword,
          level: staffLevel,
          Profile: {
            phone: phone.trim(),
            fullname: `${firstName.trim()} ${lastName.trim()}`,
          },
        },
        { include: [{ model: StaffProfile, as: 'Profile' }] },
      );

      newStaff.password = undefined;
      const message = `Staff ${staffLevel} created successfully`;

      return response.created(res, { message, newStaff });
    } catch (errors) {
      return response.internalError(res, { errors });
    }
  }

  /**
   * Method to create a new Account Type given the accountName, interestRate, & minimumBalance
   * @param {object} req Request object containing the staff data
   * @param {object} res Response object
   * @return {object} JSON response
   */
  static async createAccountType(req, res) {
    const { accountName: name, interestRate, minimumBalance } = req.body;

    try {
      const accountType = await AccountType.findOne({
        where: {
          [Op.or]: [
            {
              name: name.trim(),
            },
          ],
        },
      });

      if (accountType) {
        return response.alreadyExists(res, {
          message: 'This Account Type has already been created',
        });
      }

      const newAccountType = await AccountType.create({
        name: name.trim(),
        interestRate,
        minimumBalance,
      });

      const message = 'AccountType created successfully';

      return response.created(res, { message, newAccountType });
    } catch (errors) {
      return response.internalError(res, { errors });
    }
  }
}

export default SuperAdminController;
