module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('LoanGaurantors', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    fullname: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
    },
    occupation: {
      type: Sequelize.STRING,
    },
    monthlyIncome: {
      type: Sequelize.DECIMAL,
    },
    placeOfwork: {
      type: Sequelize.STRING,
    },
    bvn: {
      type: Sequelize.STRING,
    },
    bankName: {
      type: Sequelize.STRING,
    },
    accountNumber: {
      type: Sequelize.BIGINT,
    },
    bankAcctType: {
      type: Sequelize.STRING,
    },
    employerName: {
      type: Sequelize.STRING,
    },
    relationship: {
      type: Sequelize.STRING,
    },
    phone: {
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
  down: queryInterface => queryInterface.dropTable('LoanGaurantors'),
};
