import response from '../helpers/responses';
import requireFields from './validation/requireFields';
import validateReqKeys from './validation/validateReqKeys';

const superAdminActions = {
  validateCreateStaff: (req, res, next) => {
    requireFields(req, [
      'email',
      'phone',
      'firstName',
      'lastName',
      'staffLevel',
      'password',
      'passwordConfirmation',
    ]);

    validateReqKeys(req, Object.keys(req.body));

    if (req.body.password && req.body.passwordConfirmation) {
      req
        .checkBody(
          'passwordConfirmation',
          'PasswordConfirmation does not match the supplied Password',
        )
        .equals(req.body.password);
    }

    const errors = req.validationErrors();
    if (errors) {
      return response.badRequest(res, { errors });
    }
    return next();
  },

  validateUpdateStaff: (req, res, next) => {
    validateReqKeys(req, Object.keys(req.body));

    const errors = req.validationErrors();
    if (errors) {
      return response.badRequest(res, { errors });
    }
    return next();
  },

  validateCreateAccountType: (req, res, next) => {
    requireFields(req, ['accountName', 'interestRate', 'minimumBalance']);
    validateReqKeys(req, Object.keys(req.body));

    const errors = req.validationErrors();
    if (errors) {
      return response.badRequest(res, { errors });
    }
    return next();
  },

  validateUpdateAccountType: (req, res, next) => {
    validateReqKeys(req, Object.keys(req.body));

    const errors = req.validationErrors();
    if (errors) {
      return response.badRequest(res, { errors });
    }
    return next();
  },

  validateCreateLoanType: (req, res, next) => {
    requireFields(req, ['loanName', 'interestRate', 'maximumAmount', 'payCycle']);

    validateReqKeys(req, Object.keys(req.body));

    const errors = req.validationErrors();
    if (errors) {
      return response.badRequest(res, { errors });
    }
    return next();
  },
  validateUpdateLoanType: (req, res, next) => {
    validateReqKeys(req, Object.keys(req.body));

    const errors = req.validationErrors();
    if (errors) {
      return response.badRequest(res, { errors });
    }
    return next();
  },
};

export default superAdminActions;
