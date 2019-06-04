import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import response from '../helpers/responses';

import model from '../models';

const { Staff } = model;

dotenv.config();
const checkAuth = async (req, res, next) => {
  const token = req.headers['access-token'];

  if (!token) {
    return response.badRequest(res, {
      issue: 'token',
      message: 'Authentication issues, kindly login and try again',
    });
  }

  try {
    const verifiedToken = await jwt.verify(token, process.env.JWT_SECRET);
    const {
      email, uniqueId, id, level, secreteKey, exp,
    } = verifiedToken;

    const today = new Date();

    const staff = await Staff.findOne({
      where: {
        id,
        email,
        uniqueId,
      },
    });

    if (!staff) {
      return response.notFound(res, {
        issue: 'token',
        message: 'Opps... Account issues, are you logged in? please loggout and login again',
      });
    }

    if (staff.secreteKey !== secreteKey) {
      return response.notFound(res, {
        issue: 'token',
        message: 'Opps... Secret key mismatch, please logout and login to your account again',
      });
    }

    if (today.getTime() / 1000 > exp) {
      return response.notFound(res, {
        issue: 'token',
        message: 'Opps... Token expiration issues, please logout and login to your account again',
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
      message: 'Token provided is not valid, try again',
    });
  }
};

export default checkAuth;
