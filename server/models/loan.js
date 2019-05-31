module.exports = (sequelize, DataTypes) => {
  const Loan = sequelize.define(
    'Loan',
    {
      loanRefNo: DataTypes.STRING,
      requestAmount: DataTypes.DECIMAL,
      approvedAmount: DataTypes.DECIMAL,
      loanTypeId: DataTypes.INTEGER,
      accountNumber: DataTypes.BIGINT,
      customerId: DataTypes.INTEGER,
      staffId: DataTypes.INTEGER,
      purpose: DataTypes.TEXT,
      duration: DataTypes.STRING,
      approvalStatus: { type: DataTypes.STRING, defaultValue: 'pending' },
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
    Loan.hasMany(models.Repayment, {
      foreignKey: 'loanId',
      as: 'Repayments',
    });
  };
  return Loan;
};
