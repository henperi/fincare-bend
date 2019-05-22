const checkInvalidFields = (acceptabelFields, passedParams) => {
  const invalidFields = [];
  passedParams.map((param) => {
    const isInAcceptableFields = acceptabelFields.includes(param);
    if (!isInAcceptableFields) {
      return invalidFields.push(param);
    }
    return invalidFields;
  });
  return invalidFields;
};

export default checkInvalidFields;
