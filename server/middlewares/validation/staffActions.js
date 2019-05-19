import response from '../../helpers/responses';

const validateStaffActions = {
  validateCreateCustomer: (req, res, next) => {
    req.checkBody('email', 'email is required').isEmail();
    req.checkBody('firstName', 'firstName is required').notEmpty();
    req.checkBody('lastName', 'lastName is required').notEmpty();
    req.checkBody('phone', 'phone is required').notEmpty();

    if (req.body.firstName) {
      req
        .checkBody('firstName')
        .isLength({ min: 3 })
        .withMessage('firstName must be 3 characters or mores')
        .isLength({ max: 15 })
        .withMessage('firstName must not be greater than 15 characters');
    }

    if (req.body.lastName) {
      req
        .checkBody('lastName')
        .isLength({ min: 3 })
        .withMessage('lastName must be 3 characters or mores')
        .isLength({ max: 15 })
        .withMessage('lastName must not be greater than 15 characters');
    }

    if (req.body.otherNames) {
      req
        .checkBody('otherNames')
        .isLength({ min: 3 })
        .withMessage('otherNames must be 3 characters or mores')
        .isLength({ max: 15 })
        .withMessage('otherNames must not be greater than 15 characters');
    }

    if (req.body.phone) {
      req
        .checkBody('phone')
        .notEmpty()
        .withMessage('Phone number is required')
        .isLength({ min: 11, max: 11 })
        .withMessage('Phone number must be an 11 digit nigerian number');
    }

    const errors = req.validationErrors();
    if (errors) {
      return response.badRequest(res, { errors });
    }

    return next();
  },
  validateCreateCustomerProfile: (req, res, next) => {
    req.checkBody('gender', 'gender is required').notEmpty();
    req.checkBody('dateOfBirth', 'dateOfBirth is required').notEmpty();
    req.checkBody('placeOfBirth', 'placeOfBirth is required').notEmpty();
    req.checkBody('maritalStatus', 'maritalStatus is required').notEmpty();
    req.checkBody('nationality', 'nationality is required').notEmpty();
    req.checkBody('stateOfOrigin', 'stateOfOrigin is required').notEmpty();
    req.checkBody('LGA', 'LGA is required').notEmpty();
    req.checkBody('homeTown', 'homeTown is required').notEmpty();
    req.checkBody('profession', 'profession is required').notEmpty();

    const errors = req.validationErrors();
    if (errors) {
      return response.badRequest(res, { errors });
    }

    return next();
  },
  validateCreateCustomerAddress: (req, res, next) => {
    req.checkBody('city', 'city is required').notEmpty();
    req.checkBody('state', 'state is required').notEmpty();
    req.checkBody('addressLine1', 'addressLine1 is required').notEmpty();
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
    req.checkBody('title', 'title is required').notEmpty();
    req.checkBody('firstName', 'firstName is required').notEmpty();
    req.checkBody('lastName', 'placeOfBirth is required').notEmpty();
    req.checkBody('gender', 'gender is required').notEmpty();
    req.checkBody('relationship', 'relationship is required').notEmpty();
    req.checkBody('nationality', 'nationality is required').notEmpty();
    req.checkBody('stateOfOrigin', 'stateOfOrigin is required').notEmpty();
    req.checkBody('LGA', 'LGA is required').notEmpty();
    req.checkBody('phoneNumber', 'phoneNumber is required').notEmpty();
    req.checkBody('city', 'city is required').notEmpty();
    req.checkBody('state', 'state is required').notEmpty();
    req.checkBody('addressLine1', 'addressLine1 is required').notEmpty();
    if (req.body.addressLine2) {
      req.checkBody('addressLine2', 'addressLine2 is required').notEmpty();
    }

    const errors = req.validationErrors();
    if (errors) {
      return response.badRequest(res, { errors });
    }

    return next();
  },
};

export default validateStaffActions;
