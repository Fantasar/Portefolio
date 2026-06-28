const fs = require("fs");
const path = require("path");
const pool = require("./pool");

async function migrate() {
  const migration = fs.readFileSync(
    path.join(__dirname, "migrations", "001_init.sql"),
    "utf8",
  );
  await pool.query(migration);
  console.log("Tables créées.");

  const seed = fs.readFileSync(path.join(__dirname, "seed.sql"), "utf8");
  await pool.query(seed);
  console.log("Données initiales insérées.");

  await pool.end();
  console.log("Migration terminée.");
}

migrate().catch((err) => {
  console.error("Erreur de migration :", err);
  process.exit(1);
});
