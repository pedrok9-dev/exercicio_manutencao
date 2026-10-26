const Cliente =  require('./Cliente')
const Console =  require('./Console')
const Agendamento =  require('./Agendamento')

Cliente.hasMany(Console,{
    foreignKey: 'idCliente',
    as: 'clienteConsole',
    onDelete: 'CASCADE'
})

Console.belongsTo(Cliente,{
    foreignKey: 'idCliente',
    as: 'consoleCliente',
    allowNull: false
})

Cliente.hasMany(Agendamento,{
    foreignKey: 'idCliente',
    as: 'clienteAgendamento',
    onDelete: 'CASCADE'
})

Agendamento.belongsTo(Cliente,{
    foreignKey: 'idCliente',
    as: 'agendamentoCliente',
    allowNull: false
})

Console.hasMany(Agendamento,{
    foreignKey: 'idConsole',
    as: 'consoleAgendamento',
    onDelete: 'CASCADE'
})

Agendamento.belongsTo(Console,{
    foreignKey: 'idConsole',
    as: 'agendamentoConsole',
    allowNull: false
})

module.exports = {Cliente, Console, Agendamento}