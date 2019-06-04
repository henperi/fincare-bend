import Sequelize from 'sequelize';

import model from '../models';
import myStore from '../db/myStore';

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
   * @param {func} applyPagination
   * @param {string} key
   * @return {object} JSON response
   */
  static async getAll(applyPagination, key = '') {
    const cachedData = key && (await myStore.get(key));
    if (cachedData) {
      return { ...cachedData, cache: true };
    }

    const staffs = Staff.findAndCountAll({
      ...applyPagination(),
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

    myStore.save(key, staffs);
    return staffs;
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
