module.exports = (sequelize, DataTypes) => {
  const LoanGaurantor = sequelize.define(
    'LoanGaurantor',
    {
      fullname: DataTypes.STRING,
      address: DataTypes.STRING,
      occupation: DataTypes.STRING,
      monthlyIncome: DataTypes.DECIMAL,
      placeOfwork: DataTypes.STRING,
      bvn: DataTypes.STRING,
      bankName: DataTypes.STRING,
      accountNumber: DataTypes.BIGINT,
      bankAcctType: DataTypes.STRING,
      employerName: DataTypes.STRING,
      relationship: DataTypes.STRING,
      phone: DataTypes.STRING,
      loanId: DataTypes.INTEGER,
    },
    {},
  );
  LoanGaurantor.associate = (models) => {
    // associations can be defined here
    LoanGaurantor.belongsTo(models.Loan, {
      foreignKey: 'loanId',
    });
  };
  return LoanGaurantor;
};
