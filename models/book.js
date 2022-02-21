const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      book.belongsToMany(models.User, { through: 'bookUsers' });
      book.belongsTo(models.genre,{as: 'Genname', foreignKey:'genreId'});
      book.belongsTo(models.genre,{as: 'Autorname', foreignKey:'autorId'});       
    }
  }
  book.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      autor: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      year: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      genre: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      cover: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      price: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      'genreId':
      {
        type: DataTypes.INTEGER,
        allowNull: true,       
      },
    },
    {
      sequelize,
      modelName: 'book',
    },
  );

  return book;
};
