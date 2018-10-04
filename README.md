# **sequelize-treinamento**
Este é um projeto para fins de aprendizagem do SEQUELIZE, utilizando o NODEJS e EXPRESS.
Como banco de dados utilizei o PostgreSQL

[**Clique Aqui**](http://docs.sequelizejs.com) para acessar a documentação oficial do sequelize.
<br />
[**Clique Aqui**](http://docs.sequelizejs.com/class/lib/model.js~Model.html) para acessar uma documentação mais detalhada.

Irei fazer uma estrutura de um simples sistema acadêmico, onde teremos o cadastro de:
 - aluno 
 - curso 
 - matéria
 - turma
 - matricula

Sendo matrícula uma tabela com **FK's** de turma e aluno e outros atributos.  
E uma tabela ternária **N:M** para relacionar a turma com matéria (TurmaMateria).

## **Roteiro**
Neste projeto conterá exemplos e explicações de:

 - [Defaults do Sequelize](#defaults-do-sequelize)
 - [Configurações (básicas)](#configs-basicas)
 - [Configs](./ORM/config/README.md)
 - [Models](./ORM/models/README.md)
 - [Validators](./ORM/models/README.md#validators)
 - [Associations](./ORM/models/README.md#associations)
 - [Migrations](./ORM/migrations/README.md)
 - [Seeders](.ORM/seeders/README.md)
 - [Brincando um pouco](./routes/README.md)

Tudo apenas para entendimento da ferramenta **ORM**, para ver os detalhes mais específicos, **consulte a documentação**.

**Observação:** O projeto foi criado utilizando o **express-generator**, não abordarei esta parte.

## **Instalação**
Começaremos instalando as dependências, utilizarei o **YARN** ao invés do NPM.

    yarn add sequelize 
    yarn add pg pg-hstore
    yarn add dotenv
    yarn add sha256
    yarn add sequelize-cli --dev
Umas das vantagem do YARN é a fácil utilização de dependências de desenvolvimento sem a necessidade de apontar para o arquivo que utilizará (como é feito no NPM).

**ADICIONAIS:**
**sequelize-auto-migrations**
Esta lib irá facilitar a criação das migrations.
Adicione a seguinte dependências como desenvolvimento (dev):

> "sequelize-auto-migrations": "https://github.com/max10rogerio/sequelize-auto-migrations/archive/master.tar.gz"

**nodemon**
Usaremos o nodemon para executar a api.
Instale-o com o seguinte comando:
**yarn add nodemon --dev**

## **Defaults do Sequelize**
Vou ressaltar alguns detalhes que percebi utilizando a lib:
 - As tabelas quando utilizado os migrations ficam no plural e com a primeira letra maiúscula
 - Já as colunas são cammelCase
 - A primary-key recebe o nome de **id**
 - A foreing-key recebe o nome da tabela + id em cammelCase. Exemplo: **PessoasId** ou **CursoId...**
 - Ele cria duas colunas extras: **createdAt** e **updatedAt**

## **Configs Basicas**

Execute o comando:
> yarn sequelize init

Este comando vai criar a estrutura básica do sequelize

Crie uma pasta para separar os arquivos do ORM.
> mkdir ORM

Mova as pastas: config, models, migrations e seeders para dentro da **ORM**.

Crie um arquivo **.sequelizerc** na raiz da aplicação, no terminal faça:
> touch .sequelizerc

Este arquivo vai permitir sobrescrever algumas configurações padrões do sequelize, como por exemplo, indicar aonde estará os arquivo do mesmo (Sequelize).

No arquivo **.sequelizerc**, coloque as seguintes configurações:
```
const path = require('path')

module.exports = {
  'config': path.resolve('orm/config', 'config.js'),
  'models-path': path.resolve('orm', 'models'),
  'seeders-path': path.resolve('orm', 'seeders'),
  'migrations-path': path.resolve('orm', 'migrations')
}
```
Lembre-se de renomear o arquivo config.json para config.js
Também altere o começo do arquivo para:
```
'use strict'

require('dotenv').config() // require environment (.env file)

const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const basename = path.basename(__filename)
const env = process.env.NODE_ENV || 'development'
const config = require(path.join(__dirname, '/../config/config.js'))[env] // esta linha tbm foi alterada
const db = {}

```
