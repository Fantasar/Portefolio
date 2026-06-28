require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const session = require("express-session");
const PgSession = require("connect-pg-simple")(session);
const pool = require("./db/pool");

const app = express();

app.set("trust proxy", 1);

app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function ensureSessionTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS session (
      sid VARCHAR NOT NULL COLLATE "default",
      sess JSON NOT NULL,
      expire TIMESTAMP(6) NOT NULL,
      CONSTRAINT session_pkey PRIMARY KEY (sid)
    );
    CREATE INDEX IF NOT EXISTS idx_session_expire ON session (expire);
  `);
}

ensureSessionTable().then(() => {
  app.use(
    session({
      store: new PgSession({ pool, tableName: "session" }),
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      },
    }),
  );

  app.use("/api", require("./routes/auth"));
  app.use("/api", require("./routes/books"));
  app.use("/api", require("./routes/fiches"));

  app.use(express.static("public"));

  app.use((req, res) => {
    res.status(404).sendFile("404.html", { root: "public" });
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Coffee'Phil server running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error("Impossible de démarrer le serveur:", err.message);
  process.exit(1);
});
