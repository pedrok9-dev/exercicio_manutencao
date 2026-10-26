const Cliente = require('../models/Cliente')
const CryptoJS = require('crypto-js')
const CHAVE_SECRETA = 'segredo'

const cadastrar = async (req, res) => {
    const valores = req.body

    if (!valores.nome || !valores.email || !valores.senha || !valores.cpf || !valores.telefone) {
        return res.status(400).json({ message: 'Todos os campos (nome, email, senha, cpf, telefone) são obrigatórios!' })
    }

    if (valores.cpf.length !== 11) {
        return res.status(400).json({ message: 'O CPF deve conter exatamente 11 dígitos!' })
    }

    try {
        const clientes = await Cliente.findAll()
        const emailRepetido = clientes.some(c => c.email.toLowerCase() === valores.email.trim().toLowerCase())
        const cpfRepetido = clientes.some(c => CryptoJS.AES.decrypt(c.cpf, CHAVE_SECRETA).toString(CryptoJS.enc.Utf8) === valores.cpf)

        if (emailRepetido || cpfRepetido) {
            return res.status(409).json({ message: 'Já existe um cliente cadastrado com este e-mail ou CPF!' })
        }

        const cpfCriptografado = CryptoJS.AES.encrypt(valores.cpf, CHAVE_SECRETA).toString()
        const senhaCriptografada = CryptoJS.AES.encrypt(valores.senha, CHAVE_SECRETA).toString()

        await Cliente.create({
            nome: valores.nome,
            email: valores.email,
            senha: senhaCriptografada,
            cpf: cpfCriptografado,
            telefone: valores.telefone
        })

        return res.status(201).json({ message: 'Cliente cadastrado com sucesso!' })
    } catch (err) {
        console.error('Erro ao cadastrar cliente:', err)
        return res.status(500).json({ message: 'Erro ao cadastrar cliente!' })
    }
}

const listar = async (req, res) => {
    try {
        const clientes = await Cliente.findAll()
        let resultado = []

        clientes.forEach((el)=>{
            let cpfDescriptografado = ''
            try{
                const bytes = CryptoJS.AES.decrypt(el.cpf, CHAVE_SECRETA)
                cpfDescriptografado = bytes.toString(CryptoJS.enc.Utf8)
            }catch(err){
                cpfDescriptografado = 'Erro ao descriptografar'
                console.error(cpfDescriptografado, err)
            }
            resultado.push({
                codCliente: el.codCliente,
                nome: el.nome,
                email: el.email,
                cpf: cpfDescriptografado,
                telefone: el.telefone
            })
        })

        return res.status(200).json(resultado)
    } catch (err) {
        console.error('Erro ao listar clientes:', err)
        return res.status(500).json({ message: 'Erro ao listar clientes!' })
    }
}

const consultar = async (req, res) => {
    const id = req.params.id
    try {
        const cliente = await Cliente.findByPk(id)
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente não encontrado!' })
        }

        const bytes = CryptoJS.AES.decrypt(cliente.cpf, CHAVE_SECRETA)
        const cpfDescriptografado = bytes.toString(CryptoJS.enc.Utf8)

        return res.status(200).json({
            codCliente: cliente.codCliente,
            nome: cliente.nome,
            email: cliente.email,
            cpf: cpfDescriptografado,
            telefone: cliente.telefone
        })
    } catch (err) {
        console.error('Erro ao consultar cliente:', err)
        return res.status(500).json({ message: 'Erro ao consultar cliente!' })
    }
}

const atualizar = async (req, res) => {
    const id = req.params.id
    const valores = req.body

    try {
        const cliente = await Cliente.findByPk(id)
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente não encontrado!' })
        }

        const dadosAtualizados = {}
        for (const campo of ['nome', 'email', 'senha', 'cpf', 'telefone']) {
            if (typeof valores[campo] === 'string' && valores[campo].trim()) {
                dadosAtualizados[campo] = campo === 'senha' ? valores[campo] : valores[campo].trim()
            }
        }

        if (!Object.keys(dadosAtualizados).length) {
            return res.status(400).json({ message: 'Informe pelo menos um campo para atualizar!' })
        }

        if (dadosAtualizados.cpf) {
            if (dadosAtualizados.cpf.length !== 11) {
                return res.status(400).json({ message: 'O CPF deve conter exatamente 11 dígitos!' })
            }
            dadosAtualizados.cpf = CryptoJS.AES.encrypt(dadosAtualizados.cpf, CHAVE_SECRETA).toString()
        }

        if (dadosAtualizados.senha) {
            dadosAtualizados.senha = CryptoJS.AES.encrypt(valores.senha, CHAVE_SECRETA).toString()
        }

        await Cliente.update(dadosAtualizados, { where: { codCliente: id } })
        return res.status(200).json({ message: 'Cliente atualizado com sucesso!' })
    } catch (err) {
        console.error('Erro ao atualizar cliente:', err)
        return res.status(500).json({ message: 'Erro ao atualizar cliente!' })
    }
}

const apagar = async (req, res) => {
    const id = req.params.id
    try {
        const cliente = await Cliente.findByPk(id)
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente não encontrado!' })
        }

        await Cliente.destroy({ where: { codCliente: id } })
        return res.status(200).json({ message: 'Cliente excluído com sucesso!' })
    } catch (err) {
        console.error('Erro ao apagar cliente:', err)
        return res.status(500).json({ message: 'Erro ao apagar cliente!' })
    }
}

module.exports = {cadastrar, listar, consultar, atualizar, apagar}
