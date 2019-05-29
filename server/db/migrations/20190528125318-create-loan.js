module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Loans', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    loanRefNo: {
      type: Sequelize.STRING,
    },
    amount: {
      type: Sequelize.DECIMAL,
    },
    purpose: {
      type: Sequelize.TEXT,
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
    customerId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Customers',
        key: 'id',
        as: 'customerId',
      },
    },
    loanTypeId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'LoanTypes',
        key: 'id',
        as: 'loanTypeId',
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
  down: queryInterface => queryInterface.dropTable('Loans'),
};
