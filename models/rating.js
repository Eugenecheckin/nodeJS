const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class rating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here   
      rating.belongsTo(models.book,{as: 'Books', foreignKey:'bookId'});    
    }
  }
  rating.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      rating: {
        allowNull: false,
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
      'bookId':
      {
        type: DataTypes.INTEGER,
        allowNull: true,       
      },
      'UserId':
      {
        type: DataTypes.INTEGER,
        allowNull: true,       
      },
    },
    {
      sequelize,
      modelName: 'rating',
    },
  );

  return rating;
};
