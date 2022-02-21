module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.addColumn(
      'Users',
      'avatar',
      {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      { transaction: t },
    ),
  ])),
  down: (queryInterface) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.removeColumn('Users', 'avatar', { transaction: t }),
  ])),
};
