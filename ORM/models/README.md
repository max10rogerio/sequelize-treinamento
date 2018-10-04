# **Sobre Models**

Abaixo segue um exemplo de uma estrutura de model.
Aonde a mesma permite vários campos (atributos)
Validações (validators), hooks e etc...

```
module.exports = (sequelize, DataTypes) => {
  var nomeDaVariavel = sequelize.define('NomeDaModel', {
    nomeDoCampo: {
      type: DataTypes.STRING,
      allowNull: false,
      validators: {
        // validators here
      }
    }
  }, {
    // hooks here and another things
  })

  //associations
  nomeDaVariavel.associate = function (models) {
    //associations here
  }

  return nomeDoCampo
}
```

Explicarei o básico sobre _models_, para que possamos entender o seu funcionámento.
Caso queira ver a documentação sobre models [**CLIQUE AQUI**](http://docs.sequelizejs.com/manual/tutorial/models-definition.html#configuration).

Os campos da model são um objeto, onde o mesmo terá um tipo (type), se é nulo ou não (allowNull) e as validações (validators)

### **Type**
Para consultar os tipos que o sequelize disponibiliza, consulte a documentação [**CLIQUE AQUI**](http://docs.sequelizejs.com/manual/tutorial/models-definition.html#data-types)

### **allowNull**
Indica se o campo/atributos/coluna aceitará receber nulos ou não

> allowNull: **true** // receberá nulos
<br/>
> allowNull: **false** // não aceitará nulos e retornará uma exception.

### **Validators**

Validator são funções para validar o dado, serão executadas antes de fazer uma inserção ou alteração.

Os validators podem ser ativados apenas chamandos um dos validators default do sequelize como true.
<br/>
Exemplo:
```
email: {
  type: DataTypes.STRING,
  allowNull: false,
  validators: {
    isEmail: true // checa se o dado é um email válido ex: foo@bar.com
  }
}
```
Também é possível alterar a mensagem de erro padrão, alterando a váriavel ___msg___.
<br />
Exemplo:
```
email: {
  type: DataTypes.STRING,
  allowNull: false,
  validators: {
    isEmail: {
      msg: 'Este não é um email válido'
    }
  }
}
```
Também conseguimos passar uma função ou criar um validator para um campo.
<br />
**Value** é o dados que estaremos manipulando no momento da execução do validator.
<br />
Exemplo:
```
email: {
  type: DataTypes.STRING,
  allowNull: false,
  validators: {
    isGmail(value){
      if ( value.indexOf('@gmail.com') === -1 ){
        throw new Error('Utilize um email da Google (GMAIL)')
      }
    }
  }
}
```
Lembrando que pode ser utilizados vários validators em um único campo.

**OBS:** Tive problemas em utilizar validator customizado, pois toda vez que rodava a criação da migration, ele gerava um novo arquivo de migration.

Para consultar a documentação [**CLIQUE AQUI**](http://docs.sequelizejs.com/manual/tutorial/models-definition.html#validations)


### Associations

Para ler a documentação sobre as associoações [**CLIQUEAQUI**](http://docs.sequelizejs.com/manual/tutorial/associations.html#associations)

Existem várias formas de fazer relacionamento no sequelize, aqui falarei usando o atributo associate.
<br />
Exemplo:
```
Aluno.associate = function (models) {
  models.Aluno.belongsTo(models.Responsavel)
}
```
O associate recebe um função onde o primeiro parametro são as models (não é necessário importá-las (neste caso)), e dentro da função você informa os relacionamentos. O atributo model irá conter todas as models do projeto.


As chaves criadas pelo sequelize default, são camelCase e usa o nome da model + id.
<br />
A chave irá ficar no relaciomento maior (**N** ou **M**) ou caso deixe explicito **belongsTo** (pertence à).
<br />
Particulamente eu prefiro fazer o relaciomento explicito por fica mais fácil de visualizar e caso necessário dar manutenção. É possível mudar o nome da FK ou PK, ou a coluna que será gerada.

No caso de relacionamentos **N:M** (belongsToMany), é gerada uma tabela nova.

Vou utilizar o relacionamento entre **Responsavel** e **Aluno**

#### **ONE-TO-ONE**

```
// model do aluno
Aluno.associate = function (models) {
  models.Aluno.belongsTo(models.Responsavel)
}

//model do responsavel
Responsavel.associate = function (models) {
  models.Responsavel.hasOne(models.Aluno)
}
```
FK irá na model do Aluno com o nome Responsaveld

#### **ONE-TO-MANY**

```
// model do aluno
Aluno.associate = function (models) {
  models.Aluno.belongsTo(models.Responsavel)
}

//model do responsavel
Responsavel.associate = function (models) {
  models.Responsavel.hasMany(models.Aluno)
}
```
FK irá na model do Aluno com o nome Responsaveld

### **MANY-TO-MANY**

Relacionamentos **N:M** normalmente cria-se uma tabela ternária. No caso caso do sequelize essa tabela é criada atráves do atributo **through**.
<br />
O sequelize irá criar as colunas com a chave primária das models.
<br />
No exemplo abaixo será criado uma ligação atráves de **ResponsavelAluno**
```
// model do aluno
Aluno.associate = function (models) {
  models.Aluno.belongsToMany(models.Responsavel, {
    through: 'ResponsavelAluno'
  })
}

//model do responsavel
Responsavel.associate = function (models) {
  models.Responsavel.belongsToMany(models.Aluno, {
    through: 'ResponsavelAluno'
  })
}
```