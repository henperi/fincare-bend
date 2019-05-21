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

      case 'phoneNumber':
        return req
          .checkBody('phoneNumber')
          .isLength({ min: 11, max: 11 })
          .withMessage('phoneNumber must be an 11 digit nigerian number');

      case 'city':
        return req
          .checkBody('city')
          .isLength({ min: 3, max: 15 })
          .withMessage('City is required and must be between 3 and 15 characters');

      case 'state':
        return req
          .checkBody('state')
          .isLength({ min: 3, max: 15 })
          .withMessage('State is required and must be between 3 and 15 characters');

      case 'addressLine1':
        return req
          .checkBody('addressLine1')
          .isLength({ min: 3, max: 100 })
          .withMessage('addressLine1 is required and must be between 3 and 100 characters');

      case 'addressLine2':
        return req
          .checkBody('addressLine2')
          .isLength({ min: 3, max: 100 })
          .withMessage(
            'addressLine2 is optional but if sent it must be between 3 and 100 characters',
          );

      case 'title':
        return req
          .checkBody('title', 'title must be Mr, Mrs, Dr. Prof')
          .enum(['Mr', 'Mrs', 'Dr', 'Prof']);

      case 'gender':
        return req
          .checkBody('gender', 'gender must be Admin or Officer')
          .enum(['Admin', 'Officer']);

      case 'relationship':
        return req
          .checkBody('relationship')
          .isLength({ min: 3, max: 25 })
          .withMessage('relationship is required and must be between 3 and 25 characters');

      case 'nationality':
        return req
          .checkBody('nationality')
          .isLength({ min: 3, max: 15 })
          .withMessage('nationality is required and must be between 3 and 15 characters');

      case 'stateOfOrigin':
        return req
          .checkBody('stateOfOrigin')
          .isLength({ min: 3, max: 15 })
          .withMessage('stateOfOrigin is required and must be between 3 and 15 characters');

      case 'LGA':
        return req
          .checkBody('LGA')
          .isLength({ min: 3, max: 15 })
          .withMessage('LGA is required and must be between 3 and 15 characters');

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
