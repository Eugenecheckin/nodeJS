module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      autor: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      year: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      genre: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      cover: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      price: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('books');
  },
};
