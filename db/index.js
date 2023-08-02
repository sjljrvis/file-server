const DataStore = require('nedb')
let env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development'
global.db = new DataStore({ filename: `./${env}.db`, autoload: true });
