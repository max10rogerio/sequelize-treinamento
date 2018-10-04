'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Curso", deps: []
 * createTable "Materia", deps: []
 * createTable "Responsavel", deps: []
 * createTable "Aluno", deps: [Responsavel]
 * createTable "Turma", deps: [Curso]
 * createTable "Matricula", deps: [Aluno, Turma]
 * createTable "TurmaMateria", deps: [Materia, Turma]
 *
 **/

var info = {
    "revision": 1,
    "name": "db",
    "created": "2018-10-04T16:56:36.191Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "Curso",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "nome": {
                    "type": Sequelize.STRING,
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Materia",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "nome": {
                    "type": Sequelize.STRING,
                    "allowNull": false
                },
                "agrupada": {
                    "type": Sequelize.BOOLEAN,
                    "defaultValue": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Responsavel",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "nome": {
                    "type": Sequelize.STRING,
                    "allowNull": false
                },
                "email": {
                    "type": Sequelize.STRING,
                    "validate": {
                        "isEmail": {
                            "msg": "Insira um e-mail válido"
                        }
                    },
                    "allowNull": false
                },
                "trabalho": {
                    "type": Sequelize.STRING,
                    "allowNull": true
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Aluno",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "nome": {
                    "type": Sequelize.STRING,
                    "allowNull": false
                },
                "dtNascimento": {
                    "type": Sequelize.DATEONLY,
                    "allowNull": false
                },
                "email": {
                    "type": Sequelize.STRING,
                    "validate": {
                        "isEmail": true
                    },
                    "unique": true,
                    "allowNull": false
                },
                "senha": {
                    "type": Sequelize.STRING,
                    "allowNull": false
                },
                "ativo": {
                    "type": Sequelize.BOOLEAN,
                    "defaultValue": true,
                    "allowNull": false
                },
                "cep": {
                    "type": Sequelize.INTEGER,
                    "allowNull": true
                },
                "logradouro": {
                    "type": Sequelize.STRING,
                    "allowNull": true
                },
                "bairro": {
                    "type": Sequelize.STRING,
                    "allowNull": true
                },
                "cidade": {
                    "type": Sequelize.STRING,
                    "allowNull": true
                },
                "uf": {
                    "type": Sequelize.CHAR(2),
                    "allowNull": true
                },
                "complemento": {
                    "type": Sequelize.STRING,
                    "allowNull": true
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "ResponsavelId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Responsavel",
                        "key": "id"
                    },
                    "allowNull": true
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Turma",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "nome": {
                    "type": Sequelize.STRING,
                    "allowNull": false
                },
                "qtdeMaximaAlunos": {
                    "type": Sequelize.INTEGER,
                    "allowNull": false
                },
                "emailCoordenador": {
                    "type": Sequelize.STRING,
                    "validate": {
                        "isEmail": {
                            "msg": "Por gentileza, insira um e-mail válido para o coordenador."
                        }
                    },
                    "allowNull": true
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "CursoId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Curso",
                        "key": "id"
                    },
                    "allowNull": true
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Matricula",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "status": {
                    "type": Sequelize.ENUM('MATRICULADO', 'TRANCADO', 'DESISTENTE', 'TRANSFERIDO'),
                    "allowNull": false
                },
                "observacao": {
                    "type": Sequelize.STRING,
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "AlunoId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Aluno",
                        "key": "id"
                    },
                    "allowNull": true
                },
                "TurmaId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Turma",
                        "key": "id"
                    },
                    "allowNull": true
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "TurmaMateria",
            {
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "materiaId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Materia",
                        "key": "id"
                    },
                    "primaryKey": true
                },
                "turmaId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Turma",
                        "key": "id"
                    },
                    "primaryKey": true
                }
            },
            {}
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
