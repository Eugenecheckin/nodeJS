module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('bookUsers', {
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
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('bookUsers');
  },
};
