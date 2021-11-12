const {getConnection} = require('../services/DBService');

let db = getConnection();

beforeAll(done => {
   done()
})

afterAll(done => {
   db.end().then(() => {
      done()
   });
})

test('Connection to bdd', async (done)  => {
   require('dotenv').config();
   let con = await db.getConnection();
   con.query(`SELECT 1+1 as val`).then(() => {
      expect(1+1).toBe(2);
      done();
   });
});