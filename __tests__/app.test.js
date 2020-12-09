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

  it('Use GET route to view all friends', async () => {
    
    const data = await request(app)
      .get('/api/v1/friends');

    expect(data.body).toEqual([{
      id: '1',
      name: 'Isaac',
      age: 41,
      isBestFriend: true,
      hiddenTalent: 'being awesome'
    }]);
  });
    
  it('Use GET route to view one friend', async () => {
    
    const data = await request(app)
      .get('/api/v1/friends');

    expect(data.body).toEqual([{
      id: '1',
      name: 'Isaac',
      age: 41,
      isBestFriend: true,
      hiddenTalent: 'being awesome'
    }]);
  });
    
  it('Use PUT route to update Friend', async () => {
    
    const friend = await Friend.insert({ name: 'Isaac', age: '41', isBestFriend: 'true', hiddenTalent: 'being REALLY awesome'
    });

    const data = await request(app)
      .put(`/api/v1/friends/${friend.id}`)
      .send({
        name: 'Isaac',
        age: 41,
        isBestFriend: true,
        hiddenTalent: 'being REALLY awesome'
      });

    expect(data.body).toEqual({
      ...friend,
      name: 'Isaac',
      age: 41,
      isBestFriend: true,
      hiddenTalent: 'being REALLY awesome'
    });
  });

  it('Use DELETE route to delete Friend', async () => {
    
    const data = await request(app)
      .delete('/api/v1/friends/1')
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
