module.exports = (sequelize, DataTypes) => {
  var Materia = sequelize.define('Materia', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    agrupada: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    freezeTableName: true
  })

  Materia.associate = (models) => {
    models.Materia.belongsToMany(models.Turma, {
      through: 'TurmaMateria'
    })
  }

  return Materia
}
