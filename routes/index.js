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
  try {
    if (req.params.id) {
      result = await model.findById(req.params.id)
    } else {
      result = await model.findAll()
    }
  } catch (err) {
    result = err
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
        msg = `Registro de ${req.params.model} deletado com sucesso`
      } else {
        msg = `Nenhum registro de ${req.params.model} foi deletado...`
      }

      res.status(200).send(msg)
    })
    .catch((err) => {
      console.log(err)
      res.status(403).send(err)
    })
})

router.post('/criar-turma', async (req, res) => {
  let result = ''
  const { nome, qtde, cursoId, materias } = req.body
  await models.Turma.create({
    nome: nome,
    qtdeMaximaAlunos: qtde,
    createadAt: sequelize.fn('NOW'),
    updatedAt: sequelize.fn('NOW'),
    CursoId: cursoId
  })
    .then(async (turma) => {
      await turma.setMaterias(JSON.parse(materias))
        .then((data) => {
          result = turma
        })
        .catch((err) => {
          console.log(err)
          result = err
        })
    })
    .catch((err) => {
      console.log(err)
      result = err
    })
  res.send(result)
})

router.delete('/remover-materia', async (req, res) => {
  var turma = await models.Turma.findById(req.body.idTurma)
  let result = ''
  turma.removeMateria(JSON.parse(req.body.materias))
    .then((data) => {
      console.log(data)
      result = data
    })
    .catch((err) => {
      console.log(err)
      result = err
    })
  console.log(result)
  res.send(parseInt(result) > 0 ? 'Registro(s) deletado com sucesso.' : 'Nenhum registro foi deletado')
})

router.get('/turma/:id/materias', (req, res) => {
  try {
    models.Turma.findAll({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: models.Materia
        }
      ]
    }).then((data) => res.send(data))
  } catch (error) {
    res.status(403).send(error)
  }
})

router.get('/matricula/ver-aluno/:id', async (req, res) => {
  let result = ''

  try {
    result = await models.Matricula
      .findOne({
        where: {
          id: req.params.id
        },
        attributes: [
          'observacao',
          'status'
        ],
        include: [
          {
            model: models.Aluno,
            attributes: [
              'nome',
              'email',
              'dtNascimento'
            ],
            include: [
              {
                model: models.Responsavel,
                attributes: [
                  'nome',
                  'trabalho'
                ]
              }
            ]
          },
          {
            model: models.Turma,
            attributes: [
              'nome'
            ],
            include: [
              {
                model: models.Curso
              },
              {
                model: models.Materia
              }
            ]
          }
        ]
      })
  } catch (err) {
    result = err
  }

  res.send(result)
})

router.post('/matricular-aluno', async (req, res) => {
  const { turmaId, alunoId, observacao, status } = req.body
  let result = ''

  await models.Matricula.create({
    TurmaId: turmaId,
    AlunoId: alunoId,
    observacao: observacao || 'Nenhuma',
    status: status
  })
    .then((data) => {
      console.log(data)
      result = data
    })
    .catch((err) => {
      console.log(err)
      result = err
    })

  res.send(result)
})

module.exports = router
