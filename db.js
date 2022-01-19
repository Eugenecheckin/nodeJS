const Sequelize = require("sequelize");

const SequelizePg = new Sequelize("test1", "postgres", "fusion", {
  dialect: "postgres"
});

const User = SequelizePg.define("user", {
  id: {
    type: Sequelize.INTEGER,    
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  fullName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      is: /^(\w+([\.-]?\w+)*@\w+([\.-]?\w+)*\.\w{2,4})$/i
    },
  },
  password: {
    type: Sequelize.STRING(64),    
    allowNull: false
  },
  dob: {
    type: Sequelize.DATE,
    allowNull: false
  },
});
module.exports = { SequelizePg, User }