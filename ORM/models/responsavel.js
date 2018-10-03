
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
        },
        isGmail: (value) => {
          if (value.toLowerCase().indexOf('@gmail.com') === -1) {
            throw new Error('Insira um email google')
          }
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
