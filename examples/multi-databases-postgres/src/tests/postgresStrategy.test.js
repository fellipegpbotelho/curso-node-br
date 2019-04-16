const assert = require("assert");

const Postgres = require("../db/strategies/postgres");
const Context = require("../db/strategies/base/contextStrategy");

const context = new Context(new Postgres());

const MOCK_HEROE_CREATE = {
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
    const result = await context.create(MOCK_HEROE_CREATE);
    delete result.id;
    assert.deepEqual(result, MOCK_HEROE_CREATE);
  });
});
