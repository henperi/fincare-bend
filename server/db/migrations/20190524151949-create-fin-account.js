module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('FinAccounts', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    accountNumber: {
      allowNull: false,
      unique: true,
      type: Sequelize.BIGINT,
    },
    actType: {
      type: Sequelize.STRING,
    },
    contributionFrequency: {
      type: Sequelize.STRING,
    },
    contributionAmount: {
      type: Sequelize.DECIMAL,
    },
    ledgerBalance: {
      type: Sequelize.DECIMAL,
    },
    outstandingBalance: {
      type: Sequelize.DECIMAL,
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
    actTypeId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'AccountTypes',
        key: 'id',
        as: 'actTypeId',
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
  down: queryInterface => queryInterface.dropTable('FinAccounts'),
};
