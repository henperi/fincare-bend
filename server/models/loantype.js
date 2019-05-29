export default (sequelize, DataTypes) => {
  const LoanType = sequelize.define(
    'LoanType',
    {
      name: DataTypes.STRING,
      interestRate: DataTypes.INTEGER,
      minimumAmount: DataTypes.DECIMAL,
      maximumAmount: DataTypes.DECIMAL,
      payCycle: DataTypes.STRING,
    },
    {},
  );
  LoanType.associate = (models) => {
    // associations can be defined here
    LoanType.hasMany(models.Loan, {
      foreignKey: 'loanTypeId',
      as: 'LoanTypes',
    });
  };
  return LoanType;
};
