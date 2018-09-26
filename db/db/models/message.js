'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    fullName: {
      type: DataTypes.STRING(50),
      allowNulls: false,
      validate: {
        min: 1
      }
    },
    text: { 
      type: DataTypes.STRING(100),
      allowNulls: false,
      validate: {
        min: 1
      }
    }
  }, {});
  Message.associate = function(models) {
    // associations can be defined here
  };
  return Message;
};