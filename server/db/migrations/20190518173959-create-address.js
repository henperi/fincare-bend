module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Addresses', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    city: {
      type: Sequelize.STRING,
    },
    state: {
      type: Sequelize.STRING,
    },
    addressLine1: {
      type: Sequelize.STRING,
    },
    addressLine2: {
      type: Sequelize.STRING,
    },
    customerId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'Customers',
        key: 'id',
        as: 'customerId',
      },
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
  down: queryInterface => queryInterface.dropTable('Addresses'),
};
