'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    fullName: DataTypes.STRING,
    text: DataTypes.STRING
  }, {});
  Message.associate = function(models) {
    // associations can be defined here
  };
  return Message;
};