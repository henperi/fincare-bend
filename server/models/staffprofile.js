export default (sequelize, DataTypes) => {
  const StaffProfile = sequelize.define(
    'StaffProfile',
    {
      staffId: { type: DataTypes.STRING, unique: true, allowNull: false },
      fullname: { type: DataTypes.STRING, unique: true, allowNull: false },
    },
    {},
  );
  StaffProfile.associate = (models) => {
    // associations can be defined here
    StaffProfile.belongsTo(models.Staff, {
      foreignKey: 'staffId',
      onDelete: 'CASCADE',
    });
  };
  return StaffProfile;
};
