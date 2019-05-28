import response from '../../helpers/responses';
import validateReqKeys from './validateReqKeys';
import requireFields from './requireFields';

const loanMethods = {
  validateCreateLoan: (req, res, next) => {
    requireFields(req, ['amount', 'loanRefNo', 'loanTypeName', 'purpose', 'gaurantorsArray']);

    const { gaurantorsArray } = req.body;

    if (gaurantorsArray) {
      if (gaurantorsArray.constructor !== Array) {
        return response.badRequest(res, { message: 'gaurantorsArray ought to be an array' });
      }

      if (gaurantorsArray.length !== 2) {
        return response.badRequest(res, { message: 'You need at least two gaurantors' });
      }

      const gaurantorsAcceptableKeys = [
        'fullname',
        'address',
        'occupation',
        'monthlyIncome',
        'placeOfwork',
        'bvn',
        'bankName',
        'bankAcctType',
        'employerName',
        'relationship',
        'phone',
      ];
      gaurantorsArray.map((gaurantor, index) => {
        requireFields(req, gaurantorsAcceptableKeys, `gaurantorsArray[${index}]`);
        return validateReqKeys(req, Object.keys(gaurantor), `gaurantorsArray[${index}]`);
      });
    }

    validateReqKeys(req, Object.keys(req.body));

    const errors = req.validationErrors();
    if (errors) {
      return response.badRequest(res, { errors });
    }

    return next();
  },
};

export default loanMethods;
