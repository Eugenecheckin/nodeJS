module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.addColumn(
      'Users',
      'changePass',
      {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      { transaction: t },
    ),
  ])),
  down: (queryInterface) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.removeColumn('Users', 'changePass', { transaction: t }),
  ])),
};
