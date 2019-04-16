const Sequelize = require("sequelize");

const ICrud = require("./interfaces/interfaceCrud");

class Postgres extends ICrud {
  constructor() {
    super();
    this._driver = null;
    this._heroes = null;
    this._connect();
  }

  async isConnected() {
    try {
      await this._driver.authenticate();
      return true;
    } catch (error) {
      return false;
    }
  }

  async defineModel() {
    this._heroes = driver.define(
      "heroes",
      {
        id: {
          type: Sequelize.INTEGER,
          required: true,
          primaryKey: true,
          autoIncrement: true
        },
        nome: {
          type: Sequelize.STRING,
          required: true
        },
        poder: {
          type: Sequelize.STRING,
          required: true
        }
      },
      {
        tableName: "TB_HEROIS",
        freezeTableName: false,
        timestamps: false
      }
    );
    await this._heroes.sync();
  }

  create(item) {
    console.log("O item foi salvo em postgres...", item);
  }

  _connect() {
    this._driver = new Sequelize("heroes", "root", "root", {
      host: "localhost",
      dialect: "postgres",
      quoteIdentifiers: false
    });
  }
}

module.exports = Postgres;
