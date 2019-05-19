module.exports = (sequelize, DataTypes) => {
  const CustomerProfile = sequelize.define(
    'CustomerProfile',
    {
      gender: DataTypes.STRING,
      dateOfBirth: DataTypes.STRING,
      placeOfBirth: DataTypes.STRING,
      maritalStatus: DataTypes.STRING,
      nationality: DataTypes.STRING,
      stateOfOrigin: DataTypes.STRING,
      LGA: DataTypes.STRING,
      homeTown: DataTypes.STRING,
      profession: DataTypes.STRING,
      customerId: DataTypes.INTEGER,
    },
    {},
  );
  CustomerProfile.associate = (models) => {
    // associations can be defined here
    CustomerProfile.belongsTo(models.Customer, {
      foreignKey: 'customerId',
      onDelete: 'CASCADE',
    });
  };
  return CustomerProfile;
};
