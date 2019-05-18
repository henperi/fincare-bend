module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define(
    'Address',
    {
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      addressLine1: DataTypes.STRING,
      addressLine2: DataTypes.STRING,
      customerId: DataTypes.INTEGER,
    },
    {},
  );
  Address.associate = (models) => {
    // associations can be defined here
  };
  return Address;
};
