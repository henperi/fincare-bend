module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('LoanTypes', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
    },
    interestRate: {
      type: Sequelize.INTEGER,
    },
    minimumAmount: {
      type: Sequelize.DECIMAL,
    },
    maximumAmount: {
      type: Sequelize.DECIMAL,
    },
    payCycle: {
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: queryInterface => queryInterface.dropTable('LoanTypes'),
};
