module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'comments',
      'userId',
      {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: 'Users', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
      },
    );
  },

  async down(queryInterface) {
    return queryInterface.removeColumn(
          'comments',
          'userId',
        );
  },
};