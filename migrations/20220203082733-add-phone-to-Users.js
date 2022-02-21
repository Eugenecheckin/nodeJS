module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.addColumn(
      'Users',
      'phone',
      {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      { transaction: t },
    ),
  ])),
  down: (queryInterface) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.removeColumn('Users', 'phone', { transaction: t }),
  ])),
};
