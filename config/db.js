const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '1234',
  port: 5432,
});
client
  .connect()
  .then(() => {
    console.log(`Connected to database Successfully ... !`.cyan.underline.bold);
  })
  .catch((err) => {
    console.log(
      `We have some problem to conncet to database ... ! ${err}`.red.underline
        .bold
    );
  });



module.exports = client;
