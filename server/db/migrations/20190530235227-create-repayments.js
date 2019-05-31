module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Repayments', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    dueAmount: {
      type: Sequelize.DECIMAL,
    },
    paymentStatus: {
      type: Sequelize.BOOLEAN,
    },
    dueDate: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    loanId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Loans',
        key: 'id',
        as: 'loanId',
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
  down: queryInterface => queryInterface.dropTable('Repayments'),
};
