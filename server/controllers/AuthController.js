import Sequelize from 'sequelize';

import model from '../models';
import response from '../helpers/responses';
import { comparePassword } from '../helpers/passwordHelpers';
import generateAuthToken from '../helpers/generateAuthToken';

const { Staff, StaffProfile } = model;
const { Op } = Sequelize;
/**
 * Controller to handle neccessary staffActions
 */
class AuthController {
  /**
   * Method to authenticate a lab
   * @param {object} req Signup request
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
          errors: { message: 'Invalid login credentials, have you forgotten your login details?' },
        });
      }

      const isPasswordValid = comparePassword(password, staff.password);

      if (!isPasswordValid) {
        return response.badRequest(res, {
          errors: { message: 'Invalid login credentials, have you forgotten your login details' },
        });
      }

      const token = generateAuthToken(staff);
      const message = 'Authentication successful';

      return response.success(res, { message, token });
    } catch (error) {
      return response.internalError(res, { error });
    }
  }
}

export default AuthController;
