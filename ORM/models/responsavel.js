
module.exports = (sequelize, DataTypes) => {
  var Responsavel = sequelize.define('Responsavel', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: 'Insira um e-mail válido'
        }
      }
    },
    trabalho: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
  })

  Responsavel.associate = (models) => {
    models.Responsavel.hasMany(models.Aluno)
  }

  return Responsavel
}
