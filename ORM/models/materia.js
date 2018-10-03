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
  })

  Materia.associate = (models) => {
    models.Materia.belongsToMany(models.Turma, {
      through: 'TurmaMateria',
      foreignKey: 'materiaId'
    })
  }

  return Materia
}
