require('dotenv').config()

const path = require('path')
const pg = require('pg')
const env = process.env.NODE_ENV || 'development'
const config = require(path.join(__dirname, '/../config/config.js'))[env]

const pool = new pg.Pool({
  host: config.host,
  user: config.username,
  password: config.password,
  database: 'postgres',
  port: config.port
})

console.log(`======= MONTANDO O AMBIENTE =============`)
console.log(`======= FECHANDO AS CONEXÕES COM O BANCO DE DADOS ${config.database} =============`)

pool.query(`
  SELECT 
    pg_terminate_backend(pg_stat_activity.pid)
  FROM 
    pg_stat_activity
  WHERE 
    pg_stat_activity.datname = '${config.database}'
    AND pid <> pg_backend_pid();
`, (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log(`======= CONEXÕES FECHADAS!!! =============`)
    console.log(`======= EXCLUINDO O BANCO DE DADOS =============`)
    pool.query(`DROP DATABASE IF EXISTS ${config.database}`, (err, res) => {
      if (err) {
        console.log(err)
      } else {
        console.log(`======= CRIANDO O BANCO =============`)
        pool.query(`CREATE DATABASE ${config.database}`, (err) => {
          if (err) {
            console.log(err)
          } else {
            console.log(`======= BANCO DE DADOS CRIADO ${config.database} =============`)
          }
          pool.end()
        })
      }
    })
  }
})
