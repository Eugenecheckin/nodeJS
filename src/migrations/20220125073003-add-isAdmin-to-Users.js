module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.addColumn('Users', 'isAdmin', {
      type: Sequelize.DataTypes.BOOLEAN,
      allowNull: false,
    }, { transaction: t }),
  ])),
  down: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.removeColumn('Users', 'isAdmin', { transaction: t }),
  ])),
};
