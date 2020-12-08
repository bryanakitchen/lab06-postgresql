const pool = require('./utils/pool');

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
};
