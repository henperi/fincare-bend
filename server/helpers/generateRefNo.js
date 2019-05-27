/**
 * This method generates a random string as the staff Id
 * @returns {string} random string
 */
const generateRefNumber = () => Math.random()
  .toString(36)
  .slice(2, 10)
  .toUpperCase();

export default generateRefNumber;
