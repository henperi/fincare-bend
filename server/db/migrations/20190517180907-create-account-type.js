module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('AccountTypes', {
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
      type: Sequelize.DECIMAL,
    },
    minimumBalance: {
      type: Sequelize.DECIMAL,
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
  down: queryInterface => queryInterface.dropTable('AccountTypes'),
};
