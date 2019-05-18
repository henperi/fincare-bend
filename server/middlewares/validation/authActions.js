import response from '../../helpers/responses';

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
};

export default validateAuthActions;
