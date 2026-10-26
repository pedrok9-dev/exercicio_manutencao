const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Console = db.define('console', {
    codConsole: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    modelo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    marca: {
        type: DataTypes.STRING,
        allowNull: false
    },
    numeroSerie: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idCliente:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            key:'codCliente',
            model: 'clientes'
        }
    }
}, {
    timestamps: false,
    tableName: 'consoles'
})

module.exports = Console
