import shortId from 'shortid';
/**
 * This method generates a random string as a reference number
 * @returns {string} random string
 */
const generateRefNumber = () => shortId.generate();

// const generateRefNumber = (length = 10) => Math.random()
//   .toString(36)
//   .slice(2, length)
//   .toUpperCase();

export default generateRefNumber;
