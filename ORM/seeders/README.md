# Sobre os seeders

Seeders são dados ou mudanças que você poderá executar de forma sequencial. Você poderá ter N seeders e eles irão rodar na sequencia ou caso queira, poderá executar somente um.
<br />
Através do seeders você consegue inserir dados padrões no banco, excluir tabelas, recriar o banco, enfim da pra fazer bastante coisa.

Abaixo está um exemplo de seeder:
```
module.exports = {
  up: (queryInterface, Sequelize) => {
    // executará por segundo
  },

  down: (queryInterface, Sequelize) => {
    // executará primeiro
  }
}
```
As funções up e down retornam uma promise.
<br />
O primeiro parametro **queryInterface** é um objeto que pode ser usado para modificar o banco (drop, delete, create, update).
<br />
O segundo parametro **Sequelize** são os DataTypes.

Exemplo de um seeder:
```
module.exports = {
  up: (queryInterface, Sequelize) => {
    // executará por segundo
    return queryInterface.bulkInsert('Aluno', [
      {
        nome: 'Max Rogério',
        dtMatricula: Sequelize.NOW,
        ...
      }, 
      {
        nome: 'Outro usuário',
        dtMatricula: Sequelize.NOW,
        ResponsavelId: 1,
        ...
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    // executará primeiro
    return queryInterface.dropTable('Aluno')
  }
}
```

Recomendo fazer seeders simples e pequenos para facilitar a manutenção.
<br />
Para executá-los, vamos criar um comando que irá executar todos de uma vez.
<br />
No package.json adicione esse script: **"execute-all-seeders": "sequelize db:seed:all"**
