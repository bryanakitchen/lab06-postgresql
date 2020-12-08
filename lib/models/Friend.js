const pool = require('../utils/pool');

module.exports = class Friend {
    id;
    name;
    age;
    isBestFriend;
    hiddenTalent;

    constructor(row) {
      this.id = row.id;
      this.name = row.name;
      this.age = row.age;
      this.isBestFriend = row.is_best_friend;
      this.hiddenTalent = row.hidden_talent;
    }

    static async find() {
      const { rows } = await pool.query('SELECT * FROM friends');

      return rows.map(row => new Friend(row));
    }

    static async findById(id) {
      const { rows } = await pool.query('SELECT * FROM friends WHERE id=$1',
        [id]
      );

      return new Friend(rows[0]);
    }

    static async insert({ name, age, isBestFriend, hiddenTalent }) {
      const { rows } = await pool.query(
        'INSERT INTO friends (name, age, is_best_friend, hidden_talent) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, age, isBestFriend, hiddenTalent]
      );
      return new Friend(rows[0]);
    }

    static async update(id, { name, age, isBestFriend, hiddenTalent }) {
      const { rows } = await pool.query(
        `UPDATE friends 
            SET name=$1, 
            age=$2, 
            is_best_friend=$3, 
            hidden_talent=$4 
        WHERE id=$5 
        RETURNING *`,
        [name, age, isBestFriend, hiddenTalent, id]
      );
      return new Friend(rows[0]);
    }

    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE * FROM friends WHERE id=$1 RETURNING *',
        [id]
      );
      return new Friend(rows[0]);
    }
};
