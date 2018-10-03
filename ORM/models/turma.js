module.exports = (sequelize, DataTypes) => {
  var Turma = sequelize.define('Turma', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    qtdeMaximaAlunos: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    emailCoordenador: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: {
          msg: 'Por gentileza, insira um e-mail válido para o coordenador.'
        }
      }
    }
  }, {
  })

  Turma.associate = (models) => {
    models.Turma.belongsTo(models.Curso)
    models.Turma.hasMany(models.Matricula)
    models.Turma.belongsToMany(models.Materia, {
      through: 'TurmaMateria',
      foreignKey: 'turmaId'
    })
  }

  return Turma
}
