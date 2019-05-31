module.exports = (sequelize, DataTypes) => {
  const Repayment = sequelize.define(
    'Repayment',
    {
      dueAmount: DataTypes.DECIMAL,
      paymentStatus: DataTypes.BOOLEAN,
      dueDate: DataTypes.STRING,
      description: DataTypes.STRING,
      loanId: DataTypes.INTEGER,
    },
    {},
  );
  Repayment.associate = (models) => {
    // associations can be defined here
    Repayment.belongsTo(models.Loan, {
      foreignKey: 'loanId',
    });
  };
  return Repayment;
};
