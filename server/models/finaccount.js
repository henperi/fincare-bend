export default (sequelize, DataTypes) => {
  const FinAccount = sequelize.define(
    'FinAccount',
    {
      accountNumber: {
        type: DataTypes.BIGINT,
        unique: true,
        defaultValue: 2201901175,
      },
      actType: DataTypes.STRING,
      contributionFrequency: DataTypes.STRING,
      contributionAmount: DataTypes.DECIMAL,
      ledgerBalance: {
        type: DataTypes.DECIMAL,
        defaultValue: 0,
      },
      outstandingBalance: {
        type: DataTypes.DECIMAL,
        defaultValue: 0,
      },
      customerId: DataTypes.INTEGER,
      actTypeId: DataTypes.STRING,
    },
    {},
  );
  FinAccount.associate = (models) => {
    // associations can be defined here
    FinAccount.belongsTo(models.Customer, {
      foreignKey: 'customerId',
      onUpdate: 'CASCADE',
    });
    FinAccount.belongsTo(models.AccountType, {
      foreignKey: 'actTypeId',
      onUpdate: 'CASCADE',
    });
    FinAccount.hasMany(models.Transaction, {
      foreignKey: 'accountNumber',
      as: 'Transactions',
    });
  };
  return FinAccount;
};
