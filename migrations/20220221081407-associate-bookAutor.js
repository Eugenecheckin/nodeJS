module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'books',
      'autorId',
      {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: 'autors', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    );
  },

  async down(queryInterface) {
    return queryInterface.removeColumn(
          'books',
          'autorId',
        );
  },
};