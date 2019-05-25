import response from '../../helpers/responses';
import validateReqKeys from './validateReqKeys';
import requireFields from './requireFields';

const finAccountMethods = {
  validateAddFinAccount: (req, res, next) => {
    requireFields(req, ['actType', 'contributionAmount', 'contributionFrequency']);

    validateReqKeys(req, Object.keys(req.body));

    const errors = req.validationErrors();
    if (errors) {
      return response.badRequest(res, { errors });
    }

    return next();
  },
};

export default finAccountMethods;
