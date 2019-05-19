import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
// import Sequelize from 'sequelize';
import response from '../helpers/responses';

import model from '../models';

const { Staff } = model;

dotenv.config();
const checkAuth = async (req, res, next) => {
  const token = req.headers['access-token'];

  if (!token) {
    return response.badRequest(res, {
      errors: {
        message: 'Access token not found, kindly login and try again',
      },
    });
  }

  try {
    const verifiedToken = await jwt.verify(token, process.env.JWT_SECRET);
    const {
      email, uniqueId, id, level,
    } = verifiedToken;

    const staff = await Staff.findOne({ where: { id, email, uniqueId } });

    if (!staff) {
      return response.notFound(res, {
        errors: {
          message: 'Opps, your account appears to be missing',
        },
      });
    }

    res.locals.user = {
      email,
      uniqueId,
      id,
      level,
    };
    return next();
  } catch (errors) {
    return response.unAuthorized(res, {
      errors: {
        message: 'Token provided is not valid, try again',
      },
    });
  }
};
export default checkAuth;
