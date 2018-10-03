
module.exports = (sequelize, DataTypes) => {
  var Responsavel = sequelize.define('Responsavel', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    trabalho: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
  })

  Responsavel.associate = (models) => {
    models.Responsavel.hasMany(models.Aluno)
  }

  return Responsavel
}
