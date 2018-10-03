module.exports = (sequelize, DataTypes) => {
  var Curso = sequelize.define('Curso', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
  })

  Curso.associate = (models) => {
    models.Curso.hasMany(models.Turma)
  }

  return Curso
}
