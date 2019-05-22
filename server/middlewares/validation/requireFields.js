/**
 * @description Middleware function to bounce request bodies not containing desired data
 * @param {object} req: req.body[object]
 * @param {array} fields : req.body[field]
 * @param {string} object: req.body[object]
 * @returns {JSON|next} a JSON response of array errors or next()
 */
const requireFields = (req, fields, object = null) => {
  fields.map((field) => {
    const param = object ? `${object}[${field}]` : field;
    return req
      .checkBody(param)
      .notEmpty()
      .withMessage(`${param} is required`);
  });

  req.validationErrors();
};

export default requireFields;
