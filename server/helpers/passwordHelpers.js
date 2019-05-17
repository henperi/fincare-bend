import bcrypt from 'bcryptjs';

/**
 * This method hashes a string given the string and an optional salt
 * @param {string} password
 * @param {integer?} saltLength
 * @returns {string} hash
 */
const hashPassword = (password, saltLength = 10) => {
  const salt = bcrypt.genSaltSync(saltLength);
  return bcrypt.hashSync(password, salt);
};

/**
 * @param {string} sentPassword
 * @param {string} dbPassword
 * @returns {boolean} true/false
 */
const comparePassword = (sentPassword, dbPassword) => bcrypt.compareSync(sentPassword, dbPassword);

export { hashPassword, comparePassword };
