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

Para consultar a documentação [**CLIQUE AQUI**](http://docs.sequelizejs.com/manual/tutorial/models-definition.html#validations)
