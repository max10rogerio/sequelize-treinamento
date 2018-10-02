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
    freezeTableName: true
  })

  Matricula.associate = (models) => {
    models.Matricula.hasMany(models.Turma)
  }

  return Matricula
}
