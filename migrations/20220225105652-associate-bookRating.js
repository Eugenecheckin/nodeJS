'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {module.exports = {
    async up(queryInterface, Sequelize) {
      return queryInterface.createTable('bookRaiting', {
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        bookId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        UserId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        Rating: {
          allowNull: false,
          type: Sequelize.INTEGER
        },

      });
    },
  
    async down(queryInterface) {
      return queryInterface.dropTable('bookUsers');
    },
  };
  
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
