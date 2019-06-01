import Sequelize from 'sequelize';

import model from '../models';

const {
  Staff, StaffProfile, Customer, Loan,
} = model;
const { Op } = Sequelize;
/**

/**
 * Controller to handle neccessary staffActions
 */
class StaffRepo {
  /**
   * Method to get all staffs excluding SuperAdmin
   * @return {object} JSON response
   */
  static getAll() {
    return Staff.findAll({
      where: {
        level: {
          [Op.ne]: 'SuperAdmin',
        },
      },
      attributes: { exclude: ['secreteKey', 'password'] },
      include: [{ model: StaffProfile, as: 'Profile' }],
    }).catch((error) => {
      throw new Error(error);
    });
  }

  /**
   * Method to get a staff given the id
   * @param {string} id
   * @return {object} JSON response
   */
  static getById(id) {
    return Staff.findOne({
      where: {
        [Op.or]: [{ id }],
        level: {
          [Op.ne]: 'SuperAdmin',
        },
      },
      attributes: { exclude: ['secreteKey', 'password'] },
      include: [
        { model: StaffProfile, as: 'Profile' },
        { model: Customer, as: 'Customers', include: [{ model: Loan, as: 'Loans' }] },
      ],
    }).catch((error) => {
      throw new Error(error);
    });
  }
}

export default StaffRepo;
