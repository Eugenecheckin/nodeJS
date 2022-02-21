module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'books',
      'genreId',
      {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: 'genres', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      { transaction: t },
    );
  },

  async down(queryInterface) {
    return queryInterface.removeColumn(
          'books',
          'genreId',
          { transaction: t },
        );
  },
};