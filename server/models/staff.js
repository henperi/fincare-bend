export default (sequelize, DataTypes) => {
  const Staff = sequelize.define(
    'Staff',
    {
      uniqueId: { type: DataTypes.STRING, unique: true, allowNull: false },
      email: { type: DataTypes.STRING, unique: true, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
      level: { type: DataTypes.STRING, allowNull: false },
    },
    {},
  );
  Staff.associate = (models) => {
    // associations can be defined here
    Staff.hasOne(models.StaffProfile, {
      foreignKey: 'staffId',
      as: 'Profile',
    });
  };
  return Staff;
};
