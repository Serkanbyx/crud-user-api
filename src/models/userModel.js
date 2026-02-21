const db = require("../config/database");

const UserModel = {
  findAll() {
    return db.prepare("SELECT * FROM users ORDER BY created_at DESC").all();
  },

  findById(id) {
    return db.prepare("SELECT * FROM users WHERE id = ?").get(id);
  },

  findByEmail(email) {
    return db.prepare("SELECT * FROM users WHERE email = ?").get(email);
  },

  create({ name, email, age }) {
    const stmt = db.prepare(
      "INSERT INTO users (name, email, age) VALUES (?, ?, ?)"
    );
    const result = stmt.run(name, email, age ?? null);
    return this.findById(result.lastInsertRowid);
  },

  update(id, { name, email, age }) {
    const stmt = db.prepare(`
      UPDATE users
      SET name = ?, email = ?, age = ?, updated_at = datetime('now')
      WHERE id = ?
    `);
    const result = stmt.run(name, email, age ?? null, id);
    if (result.changes === 0) return null;
    return this.findById(id);
  },

  delete(id) {
    const result = db.prepare("DELETE FROM users WHERE id = ?").run(id);
    return result.changes > 0;
  },
};

module.exports = UserModel;
