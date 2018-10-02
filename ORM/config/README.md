# Sobre as configurações
No arquivo de configurações é possível indicar uma infinidade de bando de dados, sendo necessários apenas alterar a variável de ambiente **NODE_ENV**, passando a config que deseja utilizar para a conexão do sequelize.
<br/>
Por padrão, caso o sequelize não encontre a variável NODE_ENV, ele irá utilizar a configuração do **development**
<br />
Exemplo:
Em seu arquivo **.env**, para usar um banco configurado de produção, passe a variável NODE_ENV como production
> NODE_ENV='production'
```
'production': {
    'database': 'yourdatabase',
    'username': 'yourusername',
    'password': 'yourpassword',
    'host': 'yourhost',
    'port': 'yourport'
    'dialect': 'yourdialect'
  }
```
Documentação sobre as configurações: [**CLIQUE AQUI**](http://docs.sequelizejs.com/manual/tutorial/migrations.html#configuration)