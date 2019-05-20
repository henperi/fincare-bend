import response from '../../helpers/responses';

const checkRequestBodyKeys = (keys, req, res) => {
  keys.map((key) => {
    switch (key) {
      case 'firstName':
        return req
          .checkBody('firstName')
          .isLength({ min: 3 })
          .withMessage('firstName must be 3 characters or mores')
          .isLength({ max: 15 })
          .withMessage('firstName must not be greater than 15 characters');

      case 'lastName':
        return req
          .checkBody('lastName')
          .isLength({ min: 3 })
          .withMessage('lastName must be 3 characters or mores')
          .isLength({ max: 15 })
          .withMessage('lastName must not be greater than 15 characters');

      case 'otherNames':
        return req
          .checkBody('otherNames')
          .isLength({ min: 3 })
          .withMessage('otherNames must be 3 characters or mores')
          .isLength({ max: 15 })
          .withMessage('otherNames must not be greater than 15 characters');

      case 'phone':
        return req
          .checkBody('phone')
          .isLength({ min: 11, max: 11 })
          .withMessage('Phone number must be an 11 digit nigerian number');

      case 'city':
        return req
          .checkBody('city')
          .isLength({ min: 3, max: 15 })
          .withMessage('City is required and must be between 3 and 15 digits');

      case 'state':
        return req
          .checkBody('state')
          .isLength({ min: 3, max: 15 })
          .withMessage('State is required and must be between 3 and 15 digits');

      case 'gender':
        return req
          .checkBody('gender', 'gender must be Admin or Officer')
          .enum(['Admin', 'Officer']);

      default:
        return null;
    }
  });
  const errors = req.validationErrors();
  if (errors) {
    return response.badRequest(res, { errors });
  }
  return response.badRequest(res, 'No error');
};

export default checkRequestBodyKeys;
