'use strict'

var Sequelize = require('sequelize')

/**
 * Actions summary:
 *
 * createTable "Responsavel", deps: []
 * createTable "Alunos", deps: [Responsavel]
 *
 **/

var info = {
  'revision': 1,
  'name': 'db',
  'created': '2018-10-02T20:05:28.078Z',
  'comment': ''
}

var migrationCommands = [{
  fn: 'createTable',
  params: [
    'Responsavel',
    {
      'id': {
        'type': Sequelize.INTEGER,
        'autoIncrement': true,
        'primaryKey': true,
        'allowNull': false
      },
      'nome': {
        'type': Sequelize.STRING,
        'allowNull': false
      },
      'trabalho': {
        'type': Sequelize.STRING,
        'allowNull': false
      },
      'createdAt': {
        'type': Sequelize.DATE,
        'allowNull': false
      },
      'updatedAt': {
        'type': Sequelize.DATE,
        'allowNull': false
      }
    },
    {}
  ]
},
{
  fn: 'createTable',
  params: [
    'Alunos',
    {
      'id': {
        'type': Sequelize.INTEGER,
        'autoIncrement': true,
        'primaryKey': true,
        'allowNull': false
      },
      'nome': {
        'type': Sequelize.STRING,
        'allowNull': false
      },
      'dtNascimento': {
        'type': Sequelize.DATEONLY,
        'allowNull': false
      },
      'email': {
        'type': Sequelize.STRING,
        'validate': {
          'isEmail': true
        },
        'allowNull': false
      },
      'senha': {
        'type': Sequelize.STRING,
        'allowNull': false
      },
      'ativo': {
        'type': Sequelize.BOOLEAN,
        'defaultValue': true,
        'allowNull': false
      },
      'cep': {
        'type': Sequelize.INTEGER,
        'allowNull': true
      },
      'logradouro': {
        'type': Sequelize.STRING,
        'allowNull': true
      },
      'bairro': {
        'type': Sequelize.STRING,
        'allowNull': true
      },
      'cidade': {
        'type': Sequelize.STRING,
        'allowNull': true
      },
      'uf': {
        'type': Sequelize.CHAR(2),
        'allowNull': true
      },
      'complemento': {
        'type': Sequelize.STRING,
        'allowNull': true
      },
      'createdAt': {
        'type': Sequelize.DATE,
        'allowNull': false
      },
      'updatedAt': {
        'type': Sequelize.DATE,
        'allowNull': false
      },
      'ResponsavelId': {
        'type': Sequelize.INTEGER,
        'onUpdate': 'CASCADE',
        'onDelete': 'SET NULL',
        'references': {
          'model': 'Responsavel',
          'key': 'id'
        },
        'allowNull': true
      }
    },
    {}
  ]
}
]

module.exports = {
  pos: 0,
  up: function (queryInterface, Sequelize) {
    var index = this.pos
    return new Promise(function (resolve, reject) {
      function next () {
        if (index < migrationCommands.length) {
          let command = migrationCommands[index]
          console.log('[#' + index + '] execute: ' + command.fn)
          index++
          queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject)
        } else { resolve() }
      }
      next()
    })
  },
  info: info
}
