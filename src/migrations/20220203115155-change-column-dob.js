module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.changeColumn('Users', 'dob', {
        type: Sequelize.DATE,
        allowNull: true,
      });
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.changeColumn('Users', 'dob', {
        type: Sequelize.DATE,
        allowNull: false,
      });
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  },
};
