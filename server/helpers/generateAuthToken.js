import jwt from 'jsonwebtoken';

const generateAuthToken = ({
  id, uniqueId, email, Profile: { fullname }, phone, level,
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
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '5d',
      },
    );
  } catch (error) {
    throw new Error(error);
  }
};

export default generateAuthToken;
