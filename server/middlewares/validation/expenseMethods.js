import moment from 'moment';
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

  validateFetchAll: (req, res, next) => {
    const { startDate, endDate } = req.query;

    if (startDate && endDate) {
      // Verify the dates
      const expectedFormats = ['YYYY-MM-DD', 'MM-DD-YYYY'];

      const validateStartDate = moment(startDate, expectedFormats, true).isValid();
      const validateEndDate = moment(endDate, expectedFormats, true).isValid();

      if (!validateStartDate) {
        const message = `The start date supplied is invalid. it should be formated as ${
          expectedFormats[0]
        } or ${expectedFormats[1]}`;
        return response.badRequest(res, { issue: 'queryParam', message });
      }

      if (!validateEndDate) {
        const message = `The end date supplied is invalid. it should be formated as ${
          expectedFormats[0]
        } or ${expectedFormats[1]}`;
        return response.badRequest(res, { issue: 'queryParam', message });
      }

      res.locals.dateRange = {
        startDate: moment(startDate, expectedFormats)
          .startOf('day')
          .format('YYYY-MM-DD HH:mm:ss'),
        endDate: moment(endDate, expectedFormats)
          .endOf('day')
          .format('YYYY-MM-DD HH:mm:ss'),
      };
    }

    return next();
  },
};

export default expenseMethods;
