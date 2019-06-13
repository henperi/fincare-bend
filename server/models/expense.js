'use strict';
module.exports = (sequelize, DataTypes) => {
  const Expense = sequelize.define('Expense', {
    title: DataTypes.STRING,
    amount: DataTypes.BIGINT,
    description: DataTypes.TEXT,
    category: DataTypes.STRING
  }, {});
  Expense.associate = function(models) {
    // associations can be defined here
  };
  return Expense;
};