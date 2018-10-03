var express = require('express')
var router = express.Router()
var sequelize = require('sequelize')
var models = require('../ORM/models')

const getModelByUrl = (modelUrl) => {
  const modelFiltered = Object.keys(models)
    .filter((item) => {
      return item.toLowerCase() === modelUrl.toLowerCase()
    })

  if (modelFiltered && Array.isArray(modelFiltered) && modelFiltered.length > 0) {
    return models[modelFiltered[0]]
  } else {
    throw new Error('Model Inválida')
  }
}

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

router.get('/:model/:id?', async (req, res) => {
  let result = ''
  const model = getModelByUrl(req.params.model)

  if (req.params.id) {
    result = await model.findById(req.params.id)
  } else {
    result = await model.findAll()
  }

  res.send(result)
})

router.post('/:model/novo', (req, res) => {
  const body = req.body
  const model = getModelByUrl(req.params.model)

  model.create({
    ...body,
    createadAt: sequelize.fn('NOW'),
    updatedAt: sequelize.fn('NOW')
  })
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      console.log(err)
      res.status(403).send(err)
    })
})

router.put('/:model/alterar/:id', (req, res) => {
  const body = req.body
  const model = getModelByUrl(req.params.model)

  model.update({
    ...body,
    updatedAt: sequelize.fn('NOW')
  }, {
    returning: true,
    where: {
      id: req.params.id
    }
  })
    .then(([ rowsUpdate, [updated] ]) => {
      res.send(updated)
    })
    .catch((err) => {
      console.log(err)
      res.status(403).send(err)
    })
})

router.delete('/:model/excluir/:id', (req, res) => {
  const model = getModelByUrl(req.params.model)

  model.destroy({
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
})

module.exports = router
