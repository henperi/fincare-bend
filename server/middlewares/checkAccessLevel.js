import response from '../helpers/responses';

const checkAccessLevel = {
  isSupperAdmin: (req, res, next) => {
    const { level } = res.locals.user;

    if (level !== 'SuperAdmin') {
      return response.unAuthorized(res, {
        message: "You're not authorised to access this resource",
      });
    }
    return next();
  },

  isAdmin: (req, res, next) => {
    const { user } = res.locals;

    if (!['SuperAdmin', 'Admin'].includes(user.level)) {
      return response.unAuthorized(res, {
        message: "You're not authorised to access this resource",
      });
    }
    return next();
  },

  isStaff: (req, res, next) => {
    const { user } = res.locals;

    if (!['SuperAdmin', 'Admin', 'Officer'].includes(user.level)) {
      return response.unAuthorized(res, {
        message: "You're not authorised to access this resource",
      });
    }
    return next();
  },
};

export default checkAccessLevel;
