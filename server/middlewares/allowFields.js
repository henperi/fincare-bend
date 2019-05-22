import response from '../helpers/responses';

/**
 * @description Middleware function to bounce request bodies containing undesired data
 * @param {array} acceptableFields fields to allow through to the app
 * @returns {JSON|next} a JSON response of array errors or next()
 */
const allowFields = acceptableFields => (req, res, next) => {
  const invalidFields = [];
  const sentFields = [];

  Object.keys(req.body).map((field) => {
    const isInAcceptableFields = acceptableFields.includes(field);
    if (!isInAcceptableFields) {
      return invalidFields.push(field);
    }
    return sentFields.push(field);
  });

  if (invalidFields.length > 0) {
    return response.badRequest(res, {
      errors: {
        message: 'You have sent invalid fields',
        invalidFields,
        acceptableFields,
      },
    });
  }
  if (sentFields.length === 0) {
    return response.badRequest(res, {
      errors: {
        message: 'Please supply one or more acceptable fields',
        acceptableFields,
      },
    });
  }
  res.locals.acceptableFields = acceptableFields;
  return next();
};

export default allowFields;
