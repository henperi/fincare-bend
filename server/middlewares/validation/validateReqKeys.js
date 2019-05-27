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
          .withMessage('Phone number must be an 11 digit nigerian number')
          .isNigerianMobile(req.body[param])
          .withMessage('Phone number must be a valid Nigerian number e.g 08061275564');

      case 'phoneNumber':
        return req
          .checkBody(param)
          .isNigerianMobile(req.body[param])
          .withMessage('Phone number must be a valid Nigerian number e.g 08061275564');

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

      case 'actType':
        return req
          .checkBody(param)
          .isLength({ min: 3, max: 25 })
          .withMessage('actType must be between 3 and 25 characters');

      case 'contributionAmount':
        return req
          .checkBody(param)
          .isInt({ min: 0, allow_leading_zeroes: false })
          .withMessage('contributionAmount must be a valid number greater than 0');

      case 'contributionFrequency':
        return req
          .checkBody(param, 'contributionFrequency must be Weekly or Monthly')
          .enum(['Weekly', 'Monthly']);

      case 'accountNumber':
        return req
          .checkBody(param)
          .isInt()
          .withMessage('accountNumber must be a valid 10 digit number')
          .isLength({ min: 10, max: 10 })
          .withMessage('accountNumber must be 10 digits only');

      case 'transactionType':
        return req
          .checkBody(param, 'transactionType must be Credit or Debit')
          .enum(['Credit', 'Debit']);

      case 'amount':
        return req
          .checkBody(param)
          .isInt({ gt: 0, allow_leading_zeroes: false })
          .withMessage('amount must be a valid number greater than 0');

      case 'referenceNo':
        return req
          .checkBody(param)
          .isLength({ min: 12 })
          .withMessage('referenceNo must be a minimum of 12 characters')
          .isLength({ max: 12 })
          .withMessage('referenceNo must not be greater than 15 characters');

      case 'description':
        return req
          .checkBody(param)
          .isLength({ min: 10 })
          .withMessage('description must be 10 characters or more')
          .isLength({ max: 300 })
          .withMessage('description must not be greater than 300 characters');

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
