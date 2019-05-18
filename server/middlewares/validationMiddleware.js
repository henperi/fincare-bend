import response from '../helpers/responses';

const validationMiddleware = {
  validateCreateStaff: (req, res, next) => {
    req.checkBody('firstName', 'firstName is required').notEmpty();
    req.checkBody('lastName', 'lastName is required').notEmpty();
    req.checkBody('staffLevel', 'staffLevel is required').notEmpty();
    req.checkBody('staffLevel', 'staffLevel must be Admin or Officer').enum(['Admin', 'Officer']);
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('passwordConfirmation', 'passwordConfirmation is required').notEmpty();
    req
      .checkBody('phone')
      .notEmpty()
      .withMessage('Phone number is required')
      .isLength({ min: 11, max: 11 })
      .withMessage('Phone number must be an 11 digit nigerian number');

    if (req.body.password && req.body.passwordConfirmation) {
      req
        .checkBody(
          'passwordConfirmation',
          'PasswordConfirmation does not match the supplied Password',
        )
        .equals(req.body.password);
    }
    if (req.body.email) {
      req.checkBody('email', 'Email is not valid').isEmail();
    }

    const errors = req.validationErrors();
    if (errors) {
      return response.badRequest(res, { errors });
    }
    return next();
  },

  validateUpdateStaff: (req, res, next) => {
    const {
      email, phone, fullName, staffLevel,
    } = req.body;

    if (email) {
      req.checkBody('email', 'Email is not valid').isEmail();
    }
    if (phone) {
      req
        .checkBody('phone')
        .isLength({ min: 11, max: 11 })
        .withMessage('Phone number must be an 11 digit nigerian number');
    }
    if (fullName) {
      req
        .check('fullName')
        .isLength({ min: 3 })
        .withMessage('fullName must be 3 characters or mores')
        .isLength({ max: 50 })
        .withMessage('fullName must not be greater than 50 characters');
    }
    if (staffLevel) {
      req.checkBody('staffLevel', 'staffLevel must be Admin or Officer').enum(['Admin', 'Officer']);
    }

    const errors = req.validationErrors();
    if (errors) {
      return response.badRequest(res, { errors });
    }
    if (!email && !phone && !fullName && !staffLevel) {
      return response.badRequest(res, {
        errors: {
          message: 'Please supply one or more fields to update',
          fields: ['email', 'phone', 'fullName', 'staffLevel'],
        },
      });
    }
    return next();
  },

  validateCreateAccountType: (req, res, next) => {
    req
      .check('accountName')
      .notEmpty()
      .withMessage('accountName is required');

    req
      .check('interestRate')
      .notEmpty()
      .withMessage('interestRate is required')
      .isInt({ min: 0, max: 100, allow_leading_zeroes: false })
      .withMessage('interestRate must be a valid number between 0 and 100');

    req
      .check('minimumBalance')
      .notEmpty()
      .withMessage('minimumBalance is required')
      .isInt({ min: 0, allow_leading_zeroes: false })
      .withMessage('minimumBalance must be a valid number');

    const errors = req.validationErrors();
    if (errors) {
      return response.badRequest(res, { errors });
    }
    return next();
  },

  validateUpdateAccountType: (req, res, next) => {
    const { accountName, interestRate, minimumBalance } = req.body;
    if (accountName) {
      req
        .check('accountName')
        .notEmpty()
        .withMessage('accountName is required');
    }
    if (interestRate) {
      req
        .check('interestRate')
        .notEmpty()
        .withMessage('interestRate is required')
        .isInt({ min: 0, max: 100, allow_leading_zeroes: false })
        .withMessage('interestRate must be a valid number between 0 and 100');
    }
    if (minimumBalance) {
      req
        .check('minimumBalance')
        .notEmpty()
        .withMessage('minimumBalance is required')
        .isInt({ min: 0, allow_leading_zeroes: false })
        .withMessage('minimumBalance must be a valid number');
    }

    const errors = req.validationErrors();
    if (errors) {
      return response.badRequest(res, { errors });
    }
    if (!accountName && !interestRate && !minimumBalance) {
      return response.badRequest(res, {
        errors: {
          message: 'Please supply one or more fields to update',
          fields: ['accountName', 'interestRate', 'minimumBalance'],
        },
      });
    }
    return next();
  },

  validateCreateLoanType: (req, res, next) => {
    req
      .check('loanName')
      .notEmpty()
      .withMessage('loanName is required');

    req
      .check('interestRate')
      .notEmpty()
      .withMessage('interestRate is required')
      .isInt({ min: 0, max: 100, allow_leading_zeroes: false })
      .withMessage('interestRate must be a valid number between 0 and 100');

    req
      .check('maximumAmount')
      .notEmpty()
      .withMessage('maximumAmount is required')
      .isInt({ min: 0, allow_leading_zeroes: false })
      .withMessage('maximumAmount must be a valid number');

    req
      .check('payCycle')
      .notEmpty()
      .withMessage('payCycle is required');

    const errors = req.validationErrors();
    if (errors) {
      return response.badRequest(res, { errors });
    }
    return next();
  },
  validateUpdateLoanType: (req, res, next) => {
    const {
      loanName, interestRate, maximumAmount, payCycle,
    } = req.body;
    if (loanName) {
      req
        .check('loanName')
        .notEmpty()
        .withMessage('loanName is required');
    }
    if (interestRate) {
      req
        .check('interestRate')
        .notEmpty()
        .withMessage('interestRate is required')
        .isInt({ min: 0, max: 100, allow_leading_zeroes: false })
        .withMessage('interestRate must be a valid number between 0 and 100');
    }
    if (maximumAmount) {
      req
        .check('maximumAmount')
        .notEmpty()
        .withMessage('maximumAmount is required')
        .isInt({ min: 0, allow_leading_zeroes: false })
        .withMessage('maximumAmount must be a valid number');
    }
    if (payCycle) {
      req
        .check('payCycle')
        .notEmpty()
        .withMessage('payCycle is required');
    }

    const errors = req.validationErrors();
    if (errors) {
      return response.badRequest(res, { errors });
    }
    if (!loanName && !interestRate && !maximumAmount && !payCycle) {
      return response.badRequest(res, {
        errors: {
          message: 'Please supply one or more fields to update',
          fields: ['loanName', 'interestRate', 'maximumAmount', 'payCycle'],
        },
      });
    }
    return next();
  },
};

export default validationMiddleware;
