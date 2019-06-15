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
   * @param {string} res
   * @return {array} Array of loans
   */
  static async getAll(key = '', res) {
    const { dateRange, applyPagination } = res.locals;
    const cachedData = key && (await myStore.get(key));

    if (cachedData) {
      return { ...cachedData, cache: true };
    }

    let applyDateFilter;
    if (dateRange) {
      const { startDate, endDate } = dateRange;
      applyDateFilter = {
        createdAt: {
          [Op.between]: [startDate, endDate],
        },
      };
    }

    const expenses = Expense.findAndCountAll({
      where: {
        ...applyDateFilter,
      },
      ...applyPagination(),
    }).catch((error) => {
      throw new Error(error);
    });

    myStore.save(key, expenses);
    return expenses;
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

  /**
   * Method to create an expense
   * @param {object} expense object
   * @return {object} Expense
   */
  static async create({
    expenseTitle: title, amount, description, category,
  }) {
    return Expense.create({
      title,
      amount,
      description,
      category,
    }).catch((error) => {
      throw new Error(error);
    });
  }
}

export default ExpenseRepo;
