const Agendamento = require('../models/Agendamento')

const cadastrar = async (req, res) => {
    const valores = req.body

    if (!valores.data || !valores.hora || !valores.idCliente || !valores.idConsole) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios!' })
    }

    try {
        await Agendamento.create({
            data: valores.data,
            hora: valores.hora,
            idCliente: valores.idCliente,
            idConsole: valores.idConsole,
        })

        return res.status(201).json({ message: 'Agendamento cadastrado com sucesso!' })
    } catch (err) {
        console.error('Erro ao cadastrar agendamento:', err)
        return res.status(500).json({ message: 'Erro ao cadastrar agendamento!' })
    }
}

const listar = async(req,res)=>{
    try{
        const dados = await Agendamento.findAll({ order: [['data', 'ASC'], ['hora', 'ASC']] })
        return res.status(200).json(dados)
    }catch(err){
        console.error('Erro ao listar agendamento:', err)
        return res.status(500).json({ message: 'Erro ao listar agendamento!' })
    }
}

const atualizar = async (req,res)=>{
    const id = req.params.id
    const valores = {}
    for (const campo of ['data', 'hora', 'idCliente', 'idConsole']) {
        const valor = req.body[campo]
        if (valor !== undefined && valor !== null && String(valor).trim() !== '') {
            valores[campo] = valor
        }
    }

    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
        return res.status(400).json({ message: 'Informe um código de agendamento válido!' })
    }

    if (!Object.keys(valores).length) {
        return res.status(400).json({ message: 'Informe pelo menos um campo para atualizar!' })
    }

    for (const campo of ['idCliente', 'idConsole']) {
        if (valores[campo] !== undefined && (!Number.isInteger(Number(valores[campo])) || Number(valores[campo]) <= 0)) {
            return res.status(400).json({ message: 'Os códigos de cliente e console devem ser inteiros positivos!' })
        }
    }

    try{
        let dados = await Agendamento.findByPk(id)

        if(!dados){
            return res.status(404).json({message: 'Agendamento não encontrado'})
        }else{
            await Agendamento.update(valores, {where: { codAgendamento: id }})
            dados = await Agendamento.findByPk(id)
            res.status(200).json({message: 'Agendamento atualizado com sucesso!', dados})
        }
    }catch(err){
        console.error('Erro ao atualizar agendamento:', err)
        res.status(500).json({message: 'Erro ao atualizar agendamento!'})
    }
}
module.exports = {cadastrar, listar, atualizar}
