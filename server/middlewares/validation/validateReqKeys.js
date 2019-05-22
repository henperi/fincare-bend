/**
 * @description General function to validate an array of sent keys using express validator
 * @param {object} req
 * @param {array} keys
 * @param {string} object
 * @returns {errors} an array of errors or null
 */
const validateReqKeys = (req, keys, object = null) => {
  keys.map((key) => {
    const param = object ? `${object}[${key}]` : key;

    switch (key) {
      case 'firstName':
        return req
          .checkBody(param)
          .isLength({ min: 3 })
          .withMessage('firstName must be 3 characters or mores')
          .isLength({ max: 15 })
          .withMessage('firstName must not be greater than 15 characters');

      case 'lastName':
        return req
          .checkBody(param)
          .isLength({ min: 3 })
          .withMessage('lastName must be 3 characters or mores')
          .isLength({ max: 15 })
          .withMessage('lastName must not be greater than 15 characters');

      case 'otherNames':
        return req
          .checkBody(param)
          .isLength({ min: 3 })
          .withMessage('otherNames must be 3 characters or more')
          .isLength({ max: 15 })
          .withMessage('otherNames must not be greater than 15 characters');

      case 'fullName':
        return req
          .checkBody(param)
          .isLength({ min: 3 })
          .withMessage('fullName must be 3 characters or mores')
          .isLength({ max: 50 })
          .withMessage('fullName must not be greater than 50 characters');

      case 'loanName':
        return req
          .checkBody(param)
          .isLength({ min: 3 })
          .withMessage('loanName must be 3 characters or mores')
          .isLength({ max: 25 })
          .withMessage('loanName must not be greater than 25 characters');

      case 'accountName':
        return req
          .checkBody(param)
          .isLength({ min: 3 })
          .withMessage('accountName must be 3 characters or mores')
          .isLength({ max: 25 })
          .withMessage('accountName must not be greater than 25 characters');

      case 'interestRate':
        return req
          .check('interestRate')
          .isInt({ min: 0, max: 100, allow_leading_zeroes: false })
          .withMessage('interestRate must be a valid number between 0 and 100');

      case 'minimumBalance':
        return req
          .check('minimumBalance')
          .isInt({ min: 0, allow_leading_zeroes: false })
          .withMessage('minimumBalance must be a valid number greater 0');

      case 'maximumAmount':
        return req
          .check('maximumAmount')
          .isInt({ min: 0, allow_leading_zeroes: false })
          .withMessage('maximumAmount must be a valid number greater 0');

      case 'payCycle':
        return req
          .checkBody(param, 'payCycle must be Weekly or Monthly')
          .enum(['Weekly', 'Monthly']);

      case 'email':
        return req
          .checkBody(param)
          .isEmail()
          .withMessage('Supplied email is invalid');

      case 'phone':
        return req
          .checkBody(param)
          .isLength({ min: 11, max: 11 })
          .withMessage('Phone number must be an 11 digit nigerian number');

      case 'phoneNumber':
        return req
          .checkBody(param)
          .isLength({ min: 11, max: 11 })
          .withMessage('phoneNumber must be an 11 digit nigerian number');

      case 'title':
        return req
          .checkBody(param, 'title must be Mr, Mrs, Dr. Prof')
          .enum(['Mr', 'Mrs', 'Dr', 'Prof']);

      case 'staffLevel':
        return req
          .checkBody(param, 'staffLevel must be Admin or Officer')
          .enum(['Admin', 'Officer']);

      case 'gender':
        return req.checkBody(param, 'gender must be Male or Female').enum(['Male', 'Female']);

      case 'dateOfBirth':
        return req
          .checkBody(param)
          .isLength({ min: 3, max: 25 })
          .withMessage('dateOfBirth is required and must be between 3 and 25 characters');

      case 'placeOfBirth':
        return req
          .checkBody(param)
          .isLength({ min: 3, max: 15 })
          .withMessage('placeOfBirth is required and must be between 3 and 15 characters');

      case 'maritalStatus':
        return req
          .checkBody(param)
          .isLength({ min: 3, max: 15 })
          .withMessage('maritalStatus is required and must be between 3 and 15 characters');

      case 'nationality':
        return req
          .checkBody(param)
          .isLength({ min: 3, max: 15 })
          .withMessage('nationality is required and must be between 3 and 15 characters');

      case 'stateOfOrigin':
        return req
          .checkBody(param)
          .isLength({ min: 3, max: 15 })
          .withMessage('stateOfOrigin is required and must be between 3 and 15 characters');

      case 'LGA':
        return req
          .checkBody(param)
          .isLength({ min: 3, max: 15 })
          .withMessage('LGA is required and must be between 3 and 15 characters');

      case 'homeTown':
        return req
          .checkBody(param)
          .isLength({ min: 3, max: 15 })
          .withMessage('homeTown is required and must be between 3 and 15 characters');

      case 'profession':
        return req
          .checkBody(param)
          .isLength({ min: 3, max: 15 })
          .withMessage('profession is required and must be between 3 and 15 characters');

      case 'city':
        return req
          .checkBody(param)
          .isLength({ min: 3, max: 15 })
          .withMessage('City is required and must be between 3 and 15 characters');

      case 'state':
        return req
          .checkBody(param)
          .isLength({ min: 3, max: 15 })
          .withMessage('State is required and must be between 3 and 15 characters');

      case 'addressLine1':
        return req
          .checkBody(param)
          .isLength({ min: 3, max: 100 })
          .withMessage('addressLine1 is required and must be between 3 and 100 characters');

      case 'addressLine2':
        return req
          .checkBody(param)
          .isLength({ min: 3, max: 100 })
          .withMessage(
            'addressLine2 is optional but if sent it must be between 3 and 100 characters',
          );

      case 'relationship':
        return req
          .checkBody(param)
          .isLength({ min: 3, max: 25 })
          .withMessage('relationship is required and must be between 3 and 25 characters');

      default:
        return null;
    }
  });
  const errors = req.validationErrors();
  if (errors) {
    return errors;
  }
  return null;
};

export default validateReqKeys;
