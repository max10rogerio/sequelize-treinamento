require('dotenv').config() // magic

module.exports = {
  'development': {
    'database': 'sequelize',
    'username': 'postgres',
    'password': '123456',
    'port': '5432',
    'host': 'localhost',
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
