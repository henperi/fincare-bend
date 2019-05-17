import response from '../helpers/responses';

const checkAccessLevel = {
  isSupperAdmin: (req, res, next) => {
    const { level } = req.app.locals.user;

    if (level !== 'SuperAdmin') {
      return response.unAuthorized(res, {
        errors: {
          message: "You're not authorised to access this resource",
        },
      });
    }
    return next();
  },
};

export default checkAccessLevel;
