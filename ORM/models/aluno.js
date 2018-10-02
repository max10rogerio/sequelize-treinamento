module.exports = (sequelize, DataTypes) => {
  var Aluno = sequelize.define('Aluno', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dtNascimento: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    cep: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    logradouro: {
      type: DataTypes.STRING,
      allowNull: true
    },
    bairro: {
      type: DataTypes.STRING,
      allowNull: true
    },
    cidade: {
      type: DataTypes.STRING,
      allowNull: true
    },
    uf: {
      type: DataTypes.CHAR({
        length: 2
      }),
      allowNull: true
    },
    complemento: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {})

  Aluno.associate = function (models) {
  }

  return Aluno
}
