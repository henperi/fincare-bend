import response from '../../helpers/responses';
import validateReqKeys from './validateReqKeys';
import requireFields from './requireFields';

const expenseMethods = {
  validateCreate: (req, res, next) => {
    requireFields(req, ['expenseTitle', 'amount', 'description', 'category']);

    validateReqKeys(req, Object.keys(req.body));

    const errors = req.validationErrors();
    if (errors) {
      return response.badRequest(res, { errors });
    }

    return next();
  },
};

export default expenseMethods;
