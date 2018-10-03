# Sobre migrations

Trabalhar com migration no sequelize puro é muito trabalhoso, pois normalmente a migrations deve ser espelhada na model.
<br />
Então quando se gera uma model via **CLI**, ele cria uma migration também... Mas os atributos da model devem ser passados via CLI, o que é inviável.
<br />
Para isso utilizaremos o **sequelize-auto-migrations**, o projeto no NPM não é atualizado faz um ano, mas no github o ultimo commit foi à 2 meses.
<br />
Caso utilizem o projeto do npm, irão ter problemas no windows em relação à uma variável de ambiente do nodejs, no meu github fiz o fork e corrigi este problema [**LINK**](https://github.com/max10rogerio/sequelize-auto-migrations).

Para simplificar a forma de trabalhar com ele, vamos criar 2 comandos package.json:
```
"create-migration": "node ./node_modules/sequelize-auto-migrations/bin/makemigration --name db --models-path ORM/models --migrations-path ORM/migrations",
"execute-migration": "node ./node_modules/sequelize-auto-migrations/bin/runmigration --models-path ORM/models --migrations-path ORM/migrations"
```
Quando terminar de fazer as models, execute o comando **yarn run create-migration**, isso vai gerar um arquivo .json e um arquivo sequencial em js. Dentro desses arquivo estará descrito o banco de dados.
<br />
***
**SEMPRE CONFIRA ELE**
***
Para gerar as tabelas no seu banco do banco de dados, execute o comando **yarn run execute-migration**. Também recomendo conferir se tudo foi gerado corretamente.
