module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Transactions', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    referenceNo: {
      type: Sequelize.STRING,
    },
    type: {
      type: Sequelize.STRING,
    },
    amount: {
      type: Sequelize.DECIMAL,
    },
    accountNumber: {
      type: Sequelize.BIGINT,
      allowNull: false,
      references: {
        model: 'FinAccounts',
        key: 'accountNumber',
        as: 'accountNumber',
      },
    },
    description: {
      type: Sequelize.TEXT,
    },
    customerId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Customers',
        key: 'id',
        as: 'customerId',
      },
    },
    staffId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Staffs',
        key: 'id',
        as: 'staffId',
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
  down: queryInterface => queryInterface.dropTable('Transactions'),
};
