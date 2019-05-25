export default (sequelize, DataTypes) => {
  const AccountType = sequelize.define(
    'AccountType',
    {
      name: DataTypes.STRING,
      interestRate: DataTypes.INTEGER,
      minimumBalance: DataTypes.INTEGER,
    },
    {},
  );
  AccountType.associate = (models) => {
    // associations can be defined here
    AccountType.hasMany(models.FinAccount, {
      foreignKey: 'actTypeId',
      as: 'FinAccount',
    });
  };
  return AccountType;
};
