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

router.post('/aluno/novo', (req, res) => {
  models.Aluno.create({

  })
})

module.exports = router
