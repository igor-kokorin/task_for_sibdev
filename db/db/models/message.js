'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    fullName: {
      type: DataTypes.STRING
    },
    text: { 
      type: DataTypes.STRING
    }
  }, {});
  Message.associate = function(models) {
    // associations can be defined here
  };
  return Message;
};