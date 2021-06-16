const request = require('supertest');

const { app } = require('../src/app');

describe('GET HOME', () => {
  it('responds with a json message', (done) => {

    request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        message: "hii, it's stockbit test",
        success: true
      }, done);
  });
});

describe('GET SEARCH SERVICES', () => {
  it('responds with data of list movie', (done) => {

    request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

// describe('GET /v1/emojis', () => {
//   it('responds with a json message', (done) => {
//     request(app)
//       .get('/v1/emojis')
//       .set('Accept', 'application/json')
//       .expect('Content-Type', /json/)
//       .expect(200, ['😀', '😳', '🙄'], done);
//   });
// });
