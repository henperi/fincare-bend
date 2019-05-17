export default (sequelize, DataTypes) => {
  const LoanType = sequelize.define(
    'LoanType',
    {
      name: DataTypes.STRING,
      interestRate: DataTypes.INTEGER,
      maximumAmount: DataTypes.INTEGER,
      payCycle: DataTypes.STRING,
    },
    {},
  );
  LoanType.associate = (models) => {
    // associations can be defined here
  };
  return LoanType;
};
