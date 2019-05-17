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
    req.checkBody('phone', 'Phone number is required').notEmpty();
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
};

export default validationMiddleware;