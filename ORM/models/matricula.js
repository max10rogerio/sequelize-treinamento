module.exports = (sequelize, DataTypes) => {
  var Matricula = sequelize.define('Matricula', {
    status: {
      type: DataTypes.ENUM('MATRICULADO', 'TRANCADO', 'DESISTENTE', 'TRANSFERIDO'),
      allowNull: false
    },
    observacao: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
  })

  Matricula.associate = (models) => {
    models.Matricula.belongsTo(models.Turma)
    models.Matricula.belongsTo(models.Aluno)
  }

  return Matricula
}
