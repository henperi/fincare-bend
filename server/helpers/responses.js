/* eslint-disable valid-jsdoc */
import dotenv from 'dotenv';

dotenv.config();

const response = {
  /**
   *
   */
  success: (res, data, code = 200) => res.status(code).json({
    success: true,
    data,
  }),

  /**
   *
   */
  created: (res, data, code = 201) => res.status(code).json({
    success: true,
    data,
  }),

  /**
   *
   */
  notFound: (res, data, code = 404) => res.status(code).json({
    success: false,
    data,
  }),

  /**
   *
   */
  forbidden: (res, data, code = 403) => res.status(code).json({
    success: false,
    data,
  }),

  /**
   *
   */
  badRequest: (res, data, code = 400) => res.status(code).json({
    success: false,
    data,
  }),

  /**
   *
   */
  unAuthorized: (res, data, code = 401) => res.status(code).json({
    success: false,
    data,
  }),

  /**
   *
   */
  alreadyExists: (res, data, code = 409) => res.status(code).json({
    success: false,
    data,
  }),

  /**
   *
   */
  internalError: (res, data, code = 500) => {
    console.log(data);
    res.status(code).json({
      data,
      success: false,
    });
  },
};

export default response;
