module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'comments',
      'autorId',
      {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: 'autors', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
      },
    );
  },

  async down(queryInterface) {
    return queryInterface.removeColumn(
          'comments',
          'autorId',
        );
  },
};