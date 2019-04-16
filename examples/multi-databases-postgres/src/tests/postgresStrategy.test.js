const assert = require("assert");

const Postgres = require("../db/strategies/postgres");
const Context = require("../db/strategies/base/contextStrategy");

const context = new Context(new Postgres());

const HEROE = {
  nome: "Gavigod",
  poder: "Flexas"
};

describe("Postgres Strategy", function() {
  this.timeout(Infinity);

  this.beforeAll(async function() {
    await context.connect();
  });

  it("PostgresSQL Connection", async function() {
    const result = await context.isConnected();
    assert.equal(result, true);
  });

  it("Create", async function() {
    const result = await context.create(HEROE);
    delete result.id;
    assert.deepEqual(result, HEROE);
  });

  it("List", async function() {
    const [result] = await context.read({ nome: HEROE.nome });
    delete result.id;
    assert.deepEqual(result, HEROE);
  });
});
