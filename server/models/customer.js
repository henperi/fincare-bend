export default (sequelize, DataTypes) => {
  const Customer = sequelize.define(
    'Customer',
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      otherNames: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      accountOfficerId: DataTypes.INTEGER,
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {},
  );
  Customer.associate = (models) => {
    // associations can be defined here
    Customer.hasOne(models.CustomerProfile, {
      foreignKey: 'customerId',
      as: 'Profile',
    });
    Customer.hasOne(models.Address, {
      foreignKey: 'customerId',
      as: 'Address',
    });
    Customer.hasOne(models.NextOfKin, {
      foreignKey: 'customerId',
      as: 'NextOfKin',
    });
    Customer.hasMany(models.FinAccount, {
      foreignKey: 'customerId',
      as: 'FinAccounts',
    });
    Customer.hasMany(models.Transaction, {
      foreignKey: 'customerId',
      as: 'Transactions',
    });
    Customer.hasMany(models.Loan, {
      foreignKey: 'customerId',
      as: 'Loans',
    });
  };
  return Customer;
};
