import Sequelize from 'sequelize';

import model from '../models';

const { Customer } = model;
const { Op } = Sequelize;
/**

/**
 * Controller to handle neccessary staffActions
 */
class CustomerRepo {
  /**
   * Method to create/record transaction on a fincare account
   * @param {object} id with Request Object

   * @return {object} JSON response
   */
  static getById(id) {
    return Customer.findOne({
      where: {
        [Op.or]: [{ id }],
      },
    }).catch((error) => {
      throw new Error(error);
    });
  }

  /**
   * Method to delete a customer account by the customer id
   * @param {object} id with Request Object
   * @return {object} FinAccount
   */
  static deleteById(id) {
    return Customer.update(
      { isDeleted: true },
      {
        where: {
          [Op.or]: [{ id }],
        },
        returning: true,
      },
    ).catch((error) => {
      throw new Error(error);
    });
  }
}

export default CustomerRepo;
