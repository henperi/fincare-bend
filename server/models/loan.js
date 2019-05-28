module.exports = (sequelize, DataTypes) => {
  const Loan = sequelize.define(
    'Loan',
    {
      amount: DataTypes.DECIMAL,
      loanRefNo: DataTypes.STRING,
      loanTypeId: DataTypes.INTEGER,
      accountNumber: DataTypes.BIGINT,
      customerId: DataTypes.INTEGER,
      staffId: DataTypes.INTEGER,
      purpose: DataTypes.TEXT,
    },
    {},
  );
  Loan.associate = (models) => {
    // associations can be defined here
    Loan.belongsTo(models.Customer, {
      foreignKey: 'customerId',
    });
    Loan.belongsTo(models.FinAccount, {
      foreignKey: 'accountNumber',
    });
    Loan.belongsTo(models.LoanType, {
      foreignKey: 'loanTypeId',
    });
    Loan.hasMany(models.LoanGaurantor, {
      foreignKey: 'loanId',
      as: 'Gaurantors',
    });
  };
  return Loan;
};
