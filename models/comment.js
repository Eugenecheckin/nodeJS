'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  comment.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    to: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    'bookId':
    {
      type: DataTypes.INTEGER,
      allowNull: true,       
    },
    'userId':
    {
      type: DataTypes.INTEGER,
      allowNull: true,       
    },
  }, {
    sequelize,
    modelName: 'comment',
  });
  return comment;
};