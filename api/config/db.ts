import { Knex, knex } from 'knex';

const config: Knex.Config = {
  client: 'mysql',
  connection: {
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'shoutbox'
  }
};

const knexInstance = knex(config);
console.log('Connected to the MySQL server.');

export default knexInstance;