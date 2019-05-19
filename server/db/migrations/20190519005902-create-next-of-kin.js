module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('NextOfKins', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    title: {
      type: Sequelize.STRING,
    },
    firstName: {
      type: Sequelize.STRING,
    },
    lastName: {
      type: Sequelize.STRING,
    },
    gender: {
      type: Sequelize.STRING,
    },
    relationship: {
      type: Sequelize.STRING,
    },
    nationality: {
      type: Sequelize.STRING,
    },
    stateOfOrigin: {
      type: Sequelize.STRING,
    },
    LGA: {
      type: Sequelize.STRING,
    },
    phoneNumber: {
      type: Sequelize.STRING,
    },
    addressLine1: {
      type: Sequelize.STRING,
    },
    addressLine2: {
      type: Sequelize.STRING,
    },
    city: {
      type: Sequelize.STRING,
    },
    state: {
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
  down: queryInterface => queryInterface.dropTable('NextOfKins'),
};
