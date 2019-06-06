import Sequelize from 'sequelize';

import model from '../models';
import response from '../helpers/responses';
import { comparePassword, hashPassword } from '../helpers/passwordHelpers';
import generateAuthToken from '../helpers/generateAuthToken';
import generateRefNumber from '../helpers/generateRefNo';

const { Staff, StaffProfile } = model;
const { Op } = Sequelize;
/**
 * Controller to handle neccessary staffActions
 */
class AuthController {
  /**
   * Method to authenticate a staff
   * @param {object} req Request object
   * @param {object} res Response to request
   * @return {object} JSON response
   */
  static async authenticateStaff(req, res) {
    const { emailOrStaffId, password } = req.body;

    try {
      const staff = await Staff.findOne({
        where: {
          [Op.or]: [{ email: emailOrStaffId }, { uniqueId: emailOrStaffId }],
        },
        include: [{ model: StaffProfile, as: 'Profile' }],
      });

      if (!staff) {
        return response.notFound(res, {
          message: 'Invalid login credentials, have you forgotten your login details?',
        });
      }

      const isPasswordValid = comparePassword(password, staff.password);

      if (!isPasswordValid) {
        return response.badRequest(res, {
          message: 'Invalid login credentials, have you forgotten your login details',
        });
      }

      const token = generateAuthToken(staff);
      const message = 'Authentication successful';

      return response.success(res, { message, token });
    } catch (error) {
      return response.internalError(res, { error });
    }
  }

  /**
   * Method to update a staffs password
   * @param {object} req  Request object
   * @param {object} res Response to request
   * @return {object} JSON response
   */
  static async updatePassword(req, res) {
    const { oldPassword, newPassword } = req.body;
    const { id } = res.locals.user;

    try {
      const staff = await Staff.findOne({
        where: {
          [Op.or]: [{ id }],
        },
      });

      if (!staff) {
        return response.notFound(res, {
          message:
            'Unable to update your password, are you logged in? Please logout then login and try again',
        });
      }

      const isPasswordValid = comparePassword(oldPassword, staff.password);

      if (!isPasswordValid) {
        return response.badRequest(res, {
          message: 'Your old password is wrong, do you have issues remembering your password',
        });
      }

      const hashedPassword = hashPassword(newPassword.trim());

      await staff.update({
        password: hashedPassword || staff.password,
        secreteKey: `${generateRefNumber()}-${staff.email}`,
      });
      const message = 'Your password has been updated successfully';

      return response.success(res, { message });
    } catch (error) {
      return response.internalError(res, { error });
    }
  }
}

export default AuthController;
