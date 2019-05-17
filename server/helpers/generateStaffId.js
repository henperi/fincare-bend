/**
 * This method generates a random string as the staff Id
 * @returns {string} random string
 */
const generateStaffId = () => Math.random()
  .toString(36)
  .slice(2, 7);

export default generateStaffId;
