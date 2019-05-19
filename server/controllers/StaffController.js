import Sequelize from 'sequelize';

import model from '../models';
import response from '../helpers/responses';

const {
  CustomerProfile, Customer, Address, NextOfKin,
} = model;
const { Op } = Sequelize;
/**
 * Controller to handle neccessary staffActions
 */
class StaffController {
  /**
   * Method to create a customer
   * @param {object} req with Customer data
   * @param {object} res Response to request
   * @return {object} JSON response
   */
  static async createCustomer(req, res) {
    const {
      firstName, lastName, otherNames, email, phone,
    } = req.body;
    const { id } = res.locals.user;

    try {
      const customer = await Customer.findOne({
        where: {
          [Op.or]: [{ email }, { phone }],
        },
      });

      if (customer && customer.email === email) {
        return response.alreadyExists(res, {
          message: 'A customer with this email already exist',
        });
      }
      if (customer && customer.phone === phone) {
        return response.alreadyExists(res, {
          message: 'A customer with this phone already exist',
        });
      }

      const newCustomer = await Customer.create(
        {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          otherNames: (otherNames && otherNames.trim()) || '',
          email: email.trim(),
          phone: phone.trim(),
          accountOfficerId: id,
          Profile: {},
          Address: {},
          NextOfKin: {},
        },
        {
          include: [
            { model: Address, as: 'Address' },
            { model: CustomerProfile, as: 'Profile' },
            { model: NextOfKin, as: 'NextOfKin' },
          ],
        },
      );

      const message = 'new customer created successfully';

      return response.created(res, { message, newCustomer });
    } catch (error) {
      return response.internalError(res, { error });
    }
  }

  /**
   * Method to create a customer profile
   * @param {object} req with customer profile data
   * @param {object} res Response to request
   * @return {object} JSON response
   */
  static async createCustomerProfile(req, res) {
    const {
      gender,
      dateOfBirth,
      placeOfBirth,
      maritalStatus,
      nationality,
      stateOfOrigin,
      LGA,
      homeTown,
      profession,
    } = req.body;

    const { customerId } = req.params;

    try {
      const customer = await Customer.findOne({
        where: {
          [Op.or]: [{ id: customerId }],
        },
        include: { model: CustomerProfile, as: 'Profile' },
      });

      if (!customer) {
        return response.notFound(res, {
          message: 'Customer does not exist',
        });
      }

      const createdProfile = await customer.Profile.update({
        gender,
        dateOfBirth,
        placeOfBirth,
        maritalStatus,
        nationality,
        stateOfOrigin,
        LGA,
        homeTown,
        profession,
      });

      const message = 'Customer profile has been added successfully';

      return response.created(res, { message, createdProfile });
    } catch (error) {
      return response.internalError(res, { error });
    }
  }

  /**
   * Method to create a customer address
   * @param {object} req with customer address data
   * @param {object} res Response to request
   * @return {object} JSON response
   */
  static async createCustomerAddress(req, res) {
    const {
      city, state, addressLine1, addressLine2,
    } = req.body;

    const { customerId } = req.params;

    try {
      const customer = await Customer.findOne({
        where: {
          [Op.or]: [{ id: customerId }],
        },
        include: { model: Address, as: 'Address' },
      });

      if (!customer) {
        return response.notFound(res, {
          message: 'Customer does not exist',
        });
      }

      const createdAddress = await customer.Address.update({
        city,
        state,
        addressLine1,
        addressLine2,
      });

      const message = 'Customer address has been added successfully';

      return response.created(res, { message, createdAddress });
    } catch (error) {
      return response.internalError(res, { error });
    }
  }

  /**
   * Method to create a customer profile
   * @param {object} req with customer profile data
   * @param {object} res Response to request
   * @return {object} JSON response
   */
  static async createCustomerNextOfKin(req, res) {
    const {
      title,
      firstName,
      lastName,
      gender,
      relationship,
      nationality,
      stateOfOrigin,
      LGA,
      phoneNumber,
      addressLine1,
      addressLine2,
      city,
      state,
    } = req.body;

    const { customerId } = req.params;

    try {
      const customer = await Customer.findOne({
        where: {
          [Op.or]: [{ id: customerId }],
        },
        include: { model: NextOfKin, as: 'NextOfKin' },
      });

      if (!customer) {
        return response.notFound(res, {
          message: 'Customer does not exist',
        });
      }

      const createdNextOfKin = await customer.NextOfKin.update({
        title,
        firstName,
        lastName,
        gender,
        relationship,
        nationality,
        stateOfOrigin,
        LGA,
        phoneNumber,
        addressLine1,
        addressLine2,
        city,
        state,
      });

      const message = 'Customer next of kin has been added successfully';

      return response.created(res, { message, createdNextOfKin });
    } catch (error) {
      return response.internalError(res, { error });
    }
  }

  /**
   * Method to fetch all customer
   * @param {object} req with
   * @param {object} res Response to request
   * @return {object} JSON response
   */
  static async fetchAllCustomers(req, res) {
    try {
      const customers = await Customer.findAll({
        where: {},
        include: [
          { model: Address, as: 'Address' },
          { model: CustomerProfile, as: 'Profile' },
          { model: NextOfKin, as: 'NextOfKin' },
        ],
      });

      const message = 'Array of 0 or more customers fetched successfully';

      return response.created(res, { message, customers });
    } catch (error) {
      return response.internalError(res, { error });
    }
  }
}

export default StaffController;
