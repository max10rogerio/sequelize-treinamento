'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Responsavel', [
      {
        nome: 'Jaum',
        trabalho: 'Desempregado',
        email: 'jaum@gmail.com',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      },
      {
        nome: 'Ricardo',
        trabalho: 'Empresário',
        email: 'teste@teste.com',
        createdAt: Sequelize.fn('NOW'),
        updatedAt: Sequelize.fn('NOW')
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
  }
}
