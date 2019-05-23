import response from '../../helpers/responses';
import validateReqKeys from './validateReqKeys';
import requireFields from './requireFields';

const validateAuthActions = {
  validateStaffAuth: (req, res, next) => {
    req.checkBody('emailOrStaffId', 'Please provide your email or staffId').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();

    const errors = req.validationErrors();
    if (errors) {
      return response.badRequest(res, { errors });
    }
    return next();
  },

  validateUpdatePassword: (req, res, next) => {
    requireFields(req, ['oldPassword', 'newPassword', 'newPasswordRepeat']);
    validateReqKeys(req, Object.keys(req.body));

    if (req.body.newPassword && req.body.newPasswordRepeat) {
      req
        .checkBody('newPassword', 'Your supplied passwords do not match')
        .equals(req.body.newPasswordRepeat);
    }

    const errors = req.validationErrors();
    if (errors) {
      return response.badRequest(res, { errors });
    }
    return next();
  },
};

export default validateAuthActions;
