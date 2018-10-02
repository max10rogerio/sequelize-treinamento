# sequelize-treinamento
Este é um projeto para fins de aprendizagem do SEQUELIZE, utilizando o NODEJS e EXPRESS.
Como banco de dados utilizei o PostgreSQL
[**Clique Aqui**](http://docs.sequelizejs.com) para acessar a documentação oficial do sequelize.
**[Clique Aqui](http://docs.sequelizejs.com/class/lib/model.js~Model.html)** para acessar uma documentação mais detalhada.

Irei fazer uma estrutura de um simples sistema acadêmico, onde teremos o cadastro de:
 - aluno 
 - curso 
 - matéria
 - turma
 - matricula.
Sendo matrícula uma tabela com **FK's** de turma e aluno e outros atributos.
E uma tabela ternária **N:M** para relacionar a turma com matéria.

## Roteiro
Neste projeto conterá exemplos e explicações de:

 - [Defaults do Sequelize](#defaults-do-sequelize)
 - Configurações (básicas)
 - Models
 - Migrations
 - Seeders
 - Validators
- Associations

Tudo apenas para entendimento da ferramenta **ORM**, para ver os detalhes mais específicos, **consulte a documentação**.

**Observação:** O projeto foi criado utilizando o **express-generator**, não abordarei esta parte.

## Instalação
Começaremos instalando as dependências, utilizarei o **YARN** ao invés do NPM.

    yarn add sequelize 
    yarn add pg pg-hstore
    yarn add sequelize-cli --dev
Umas das vantagem do YARN é a fácil utilização de dependências de desenvolvimento sem a necessidade de apontar para o arquivo que utilizará (como é feito no NPM).

**ADICIONAIS:**
**sequelize-auto-migrations**
Esta lib irá facilitar a criação das migrations.
Adicione a seguinte dependências como desenvolvimento (dev):

> "sequelize-auto-migrations": "https://github.com/max10rogerio/sequelize-auto-migrations/archive/master.tar.gz",

**nodemon**
Usaremos o nodemon para executar a api.
Instale-o com o seguinte comando:
**yarn add nodemon --dev**

## Defaults do Sequelize
Vou ressaltar alguns detalhes que percebi utilizando a lib.
As tabelas quando utilizado os migrations ficam no plural e com a primeira letra maiúscula.
Já as colunas são cammelCase.
A primary-key recebe o nome de **id**.
A foreing-key recebe o nome da tabela + id em cammelCase. Exemplo: **PessoasId** ou **CursoId...**
