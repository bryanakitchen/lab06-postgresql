const fs = require('fs');
const app = require('../lib/app');
const request = require('supertest');
const pool = require('../lib/utils/pool');
const Friend = require('../lib/models/Friend');

describe('App routes for Friend model', () => {

  beforeAll(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  afterAll(() => {
    return pool.end();
  });

  it('Use POST route to add new Friend', async () => {
    
    const data = await request(app)
      .post('/api/v1/friends')
      .send({
        name: 'Isaac',
        age: 41,
        isBestFriend: true,
        hiddenTalent: 'being awesome'
      });

    expect(data.body).toEqual({
      id: '1',
      name: 'Isaac',
      age: 41,
      isBestFriend: true,
      hiddenTalent: 'being awesome'
    });
  });
    
});
