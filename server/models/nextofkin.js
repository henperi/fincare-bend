module.exports = (sequelize, DataTypes) => {
  const NextOfKin = sequelize.define(
    'NextOfKin',
    {
      title: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      gender: DataTypes.STRING,
      relationship: DataTypes.STRING,
      nationality: DataTypes.STRING,
      stateOfOrigin: DataTypes.STRING,
      LGA: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      addressLine1: DataTypes.STRING,
      addressLine2: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      customerId: DataTypes.INTEGER,
    },
    {},
  );
  NextOfKin.associate = (models) => {
    // associations can be defined here
    NextOfKin.belongsTo(models.Customer, {
      foreignKey: 'customerId',
      onDelete: 'CASCADE',
    });
  };
  return NextOfKin;
};
