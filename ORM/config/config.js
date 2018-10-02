require('dotenv').config() // magic

module.exports = {
  'development': {
    'database': 'sequelize',
    'username': 'root',
    'password': '123456',
    'port': '5432',
    'host': 'locahost',
    'dialect': 'postgres'
  },

  'production': {
    'database': '',
    'username': '',
    'password': '',
    'host': '',
    'dialect': 'postgres'
  }
}
