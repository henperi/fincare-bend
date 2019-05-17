import Sequelize from 'sequelize';

import model from '../models';
import response from '../helpers/responses';
import { hashPassword } from '../helpers/passwordHelpers';
import generateStaffId from '../helpers/generateStaffId';

const { Staff, StaffProfile } = model;
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
          [Op.or]: [{ email }],
        },
        include: { model: StaffProfile, as: 'Profile' },
      });

      if (staff) {
        return response.alreadyExists(res, { message: 'This email has already been used' });
      }

      const hashedPassword = hashPassword(password);
      const newStaff = await Staff.create(
        {
          email,
          uniqueId: generateStaffId(),
          password: hashedPassword,
          level: staffLevel,
          Profile: {
            phone,
            fullname: `${firstName} ${lastName}`,
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
}

export default SuperAdminController;
