import jwt from 'jsonwebtoken';

const generateAuthToken = ({
  id,
  uniqueId,
  email,
  Profile: { fullname },
  phone,
  level,
  secreteKey,
}) => {
  try {
    return jwt.sign(
      {
        id,
        uniqueId,
        fullname,
        email,
        phone,
        level,
        secreteKey,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '10d',
      },
    );
  } catch (error) {
    throw new Error(error);
  }
};

export default generateAuthToken;
