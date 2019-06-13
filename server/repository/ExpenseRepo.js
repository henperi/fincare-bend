import Sequelize from 'sequelize';

import model from '../models';
import myStore from '../db/myStore';

const { Expense } = model;
const { Op } = Sequelize;
/**

/**
 * Controller to handle neccessary expenses
 */
class ExpenseRepo {
  /**
   * Method to get all expenses

   * @param {string} key
   * @return {array} Array of loans
   */
  static async getAll(key = '') {
    const cachedData = key && (await myStore.get(key));
    if (cachedData) {
      return { ...cachedData, cache: true };
    }

    const loanType = Expense.findAll({}).catch((error) => {
      throw new Error(error);
    });

    myStore.save(key, loanType);
    return loanType;
  }

  /**
   * Method to get an expense by the title
   * @param {string} title
   * @param {string} key
   * @return {object} Expense
   */
  static async getByTitle(title, key = '') {
    const cachedData = key && (await myStore.get(key));
    if (cachedData) {
      return { ...cachedData, cache: true };
    }

    const loanType = Expense.findOne({
      where: {
        [Op.or]: [{ title }],
      },
    }).catch((error) => {
      throw new Error(error);
    });

    myStore.save(key, loanType);
    return loanType;
  }
}

export default ExpenseRepo;
