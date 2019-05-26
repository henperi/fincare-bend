module.exports = (sequelize, DataTypes) => {
  const Transactions = sequelize.define(
    'Transaction',
    {
      referenceNo: DataTypes.STRING,
      accountNumber: DataTypes.BIGINT,
      type: DataTypes.STRING,
      amount: DataTypes.DECIMAL,
      description: DataTypes.TEXT,
      customerId: DataTypes.INTEGER,
      staffId: DataTypes.INTEGER,
    },
    {},
  );
  Transactions.associate = (models) => {
    // associations can be defined here
    Transactions.belongsTo(models.Customer, {
      foreignKey: 'customerId',
    });
    Transactions.belongsTo(models.Staff, {
      foreignKey: 'staffId',
    });
    Transactions.belongsTo(models.FinAccount, {
      foreignKey: 'accountNumber',
    });
  };
  return Transactions;
};
