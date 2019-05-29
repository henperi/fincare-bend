import naijaMobile from 'naija-phone-number';
import banks from '../mocks/banks';

const formatErrors = () => ({
  errorFormatter: (param, message, value) => {
    const namespace = param.split('.');
    const root = namespace.shift();
    let formParam = root;

    while (namespace.length) {
      formParam += `[${namespace.shift()}]`;
    }
    return {
      param: formParam,
      message,
      value,
    };
  },
  customValidators: {
    enum: (input, options) => options.includes(input),
    isNigerianMobile: mobile => naijaMobile.isValid(mobile),
    checkBank: bankName => !!banks.find(bank => bank.name === bankName),
  },
});

export default formatErrors;
