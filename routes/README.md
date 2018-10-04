# Brincando um pouco

Os métodos para manipulação de dados no sequelize são:
 - create
 - update
 - destroy
 - find (existem variações de find, como: findAll, findOrCreate, findAndCountAll)

## CREATE (INSERT)

Para utilizá-lo deverá ser passado um objeto para o método e todos devem atender aos seus devidos tipo e validações.
No caso de responsável, o atributo **email**, deve conter um @ e um . (ponto) e também deve ser do tipo **gmail** (método de validação customizado)

Exemplo:
```
model.Pessoa.create({
  nome: 'Max Rogério',
  createadAt: sequelize.fn('NOW'),
  updatedAt: sequelize.fn('NOW')
})
  .then((data) => {
    console.log(data)
  })
  .catch((err) => {
    console.log(err)
  })
```

Caso tudo ocorra corretamente, ele retorna um objeto com o registro criado.

## UPDATE

Para utilizá-lo você deverá passar um objeto com os dados que você deseja alterar no primeiro parametro e no segundo parametro um objeto com a condição.
<br />
O atributo **returning: true**, indica que você quer q o sequelize retorne o objeto alterado.
<br />
Por padrão ele retorna somente a quantidade de itens alterados...

```
model.Pessoa.update({
  nome: 'Luscas',
  updatedAt: sequelize.fn('NOW')
}, {
  returning: true,
  where: {
    id: 1
  }
})
  .then((data) => {
    console.log(data)
  })
  .catch((err) => {
    console.log(err)
  })
```

## DESTROY (DELETE)

Espera um objeto como condição para efetuar a operação de exclusão do banco de dados.
<br />
Retorna a quantidade de linhas excluídas.

```
 model.Pessoa.destroy({
    where: {
      id: parseInt(req.params.id)
    }
  })
    .then((data) => {
      let msg = ''

      if (parseInt(data) > 0) {
        msg = `Registro ${Object.keys(model)} de  deletado com sucesso`
      } else {
        msg = `Nenhum registro de ${Object.keys(model)} foi deletado...`
      }

      res.status(200).send(msg)
    })
    .catch((err) => {
      console.log(err)
      res.status(403).send(err)
    })
```

## FIND (SELECT)

Para buscar, o sequelize possuei vários métodos mas falarei somente sobre 2 métodos.
 - findAll() 
 - findById()

### **findAll( )**

Retorna todos os registros relacionados à aquela models.
<br />
Também suporta filtro (where), que deverá ser passado como objeto.

```
model.Pessoal.findAll()

// ou

model.Pessoa
  .findAll({
    where: {
      sexo: 'F'
    }
  })
```

### **findById( )**

Faz a busca pelo id da model (tabela), e retorna o objeto

```
model.Pessoal.findById(123)
```

No arquivo ___routes > index.js___ você poderá ver mais alguns exemplos.