import response from '../../helpers/responses';
import checkInvalidFields from './checkAcceptableFields';
import validateReqKeys from './validateReqKeys';
import requireFields from './requireFields';

const validateStaffActions = {
  validateCreateCustomer: (req, res, next) => {
    requireFields(req, ['email', 'firstName', 'lastName', 'phone']);

    validateReqKeys(req, Object.keys(req.body));

    const errors = req.validationErrors();
    if (errors) {
      return response.badRequest(res, { errors });
    }

    return next();
  },

  validateCreateCustomerProfile: (req, res, next) => {
    requireFields(req, [
      'gender',
      'dateOfBirth',
      'placeOfBirth',
      'maritalStatus',
      'nationality',
      'stateOfOrigin',
      'homeTown',
      'profession',
      'LGA',
    ]);

    const errors = req.validationErrors();
    if (errors) {
      return response.badRequest(res, { errors });
    }

    return next();
  },

  validateCreateCustomerAddress: (req, res, next) => {
    requireFields(req, ['city', 'state', 'addressLine1']);

    if (req.body.addressLine2) {
      req.checkBody('addressLine2', 'addressLine2 is required').notEmpty();
    }

    const errors = req.validationErrors();
    if (errors) {
      return response.badRequest(res, { errors });
    }

    return next();
  },

  validateCreateCustomerNextOfKin: (req, res, next) => {
    requireFields(req, [
      'title',
      'firstName',
      'lastName',
      'gender',
      'relationship',
      'nationality',
      'stateOfOrigin',
      'LGA',
      'phoneNumber',
      'addressLine1',
      'city',
      'state',
    ]);

    if (req.body.addressLine2) {
      req.checkBody('addressLine2', 'addressLine2 is required').notEmpty();
    }

    const errors = req.validationErrors();
    if (errors) {
      return response.badRequest(res, { errors });
    }

    return next();
  },

  validateUpdateCustomer: (req, res, next) => {
    const { profileObject, addressObject } = req.body;

    validateReqKeys(req, Object.keys(req.body));

    if (profileObject) {
      const profileAcceptabelFields = [
        'gender',
        'dateOfBirth',
        'placeOfBirth',
        'maritalStatus',
        'nationality',
        'stateOfOrigin',
        'LGA',
        'homeTown',
        'profession',
      ];

      const passedProfileParams = Object.keys(req.body.profileObject);

      const checkInvalidProfileObject = checkInvalidFields(
        profileAcceptabelFields,
        passedProfileParams,
      );

      if (passedProfileParams.length === 0) {
        return response.badRequest(res, {
          errors: {
            param: 'profileObject',
            message:
              'Profile object is optional but if sent it must contain one or more optional keys',
            optionalKeys: profileAcceptabelFields,
          },
        });
      }

      if (checkInvalidProfileObject.length > 0) {
        return response.badRequest(res, {
          errors: {
            param: 'profileObject',
            message: 'You have sent invalid keys for the profile object',
            invalidKeys: checkInvalidProfileObject,
            acceptableKeys: profileAcceptabelFields,
          },
        });
      }

      validateReqKeys(req, passedProfileParams, 'profileObject');
    }

    if (addressObject) {
      const addressAcceptableFields = ['city', 'state', 'addressLine1', 'addressLine2'];
      const passedAddressParams = Object.keys(addressObject);

      const checkInvalidAddressObject = checkInvalidFields(
        addressAcceptableFields,
        passedAddressParams,
      );

      if (passedAddressParams.length === 0) {
        return response.badRequest(res, {
          errors: {
            param: 'addressObject',
            message:
              'addressObject is optional but if sent it must contain one or more optional keys',
            optionalKeys: addressAcceptableFields,
          },
        });
      }

      if (passedAddressParams.length === 0 || checkInvalidAddressObject.length > 0) {
        return response.badRequest(res, {
          errors: {
            param: 'addressObject',
            message: 'You have sent invalid keys for the address object',
            invalidKeys: checkInvalidAddressObject,
            acceptableKeys: addressAcceptableFields,
          },
        });
      }

      validateReqKeys(req, passedAddressParams, 'addressObject');
    }

    const errors = req.validationErrors();
    if (errors) {
      return response.badRequest(res, { errors });
    }

    return next();
  },
};

export default validateStaffActions;
