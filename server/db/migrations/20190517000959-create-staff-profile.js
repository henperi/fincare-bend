module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('StaffProfiles', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    fullname: {
      type: Sequelize.STRING,
    },
    phone: {
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    staffId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'Staffs',
        key: 'id',
        as: 'staffId',
      },
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('StaffProfiles'),
};
