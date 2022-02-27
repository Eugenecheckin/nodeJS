'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
      return queryInterface.createTable('ratings', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        bookId: {
          type: Sequelize.DataTypes.INTEGER,
          references: {
            model: 'books', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
        },
        UserId: {
          type: Sequelize.DataTypes.INTEGER,
          references: {
            model: 'Users', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
        },
        rating: {
          allowNull: false,
          type: Sequelize.INTEGER
        },
      });
    },
  
    async down(queryInterface) {
      return queryInterface.dropTable('ratings');
    },
  };

