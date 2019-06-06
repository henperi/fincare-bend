import Sequelize from 'sequelize';

import model from '../models';
import myStore from '../db/myStore';

const { LoanType } = model;
const { Op } = Sequelize;
/**

/**
 * Controller to handle neccessary staffActions
 */
class LoanTypeRepo {
  /**
   * Method to get all loanTypes

   * @param {string} key
   * @return {array} Array of loans
   */
  static async getAll(key = '') {
    const cachedData = key && (await myStore.get(key));
    if (cachedData) {
      return { ...cachedData, cache: true };
    }

    const loanType = LoanType.findAll({}).catch((error) => {
      throw new Error(error);
    });

    myStore.save(key, loanType);
    return loanType;
  }

  /**
   * Method to get a loanType by the loanTypeName
   * @param {string} loanTypeName
   * @param {string} key
   * @return {object} LoanType
   */
  static async getByName(loanTypeName, key = '') {
    const cachedData = key && (await myStore.get(key));
    if (cachedData) {
      return { ...cachedData, cache: true };
    }

    const loanType = LoanType.findOne({
      where: {
        [Op.or]: [{ name: loanTypeName }],
      },
    }).catch((error) => {
      throw new Error(error);
    });

    myStore.save(key, loanType);
    return loanType;
  }
}

export default LoanTypeRepo;
