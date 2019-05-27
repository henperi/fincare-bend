import response from '../../helpers/responses';
import validateReqKeys from './validateReqKeys';
import requireFields from './requireFields';

const transactionMethods = {
  validateCreateTransaction: (req, res, next) => {
    requireFields(req, [
      'accountNumber',
      'transactionType',
      'amount',
      'referenceNo',
      'description',
    ]);

    validateReqKeys(req, Object.keys(req.body));

    const errors = req.validationErrors();
    if (errors) {
      return response.badRequest(res, { errors });
    }

    return next();
  },
};

export default transactionMethods;
