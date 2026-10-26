const Console = require('../models/Console')
const CryptoJS = require('crypto-js')
const CHAVE_SECRETA = 'segredo'

const cadastrar = async (req, res) => {
    const valores = req.body

    if (!valores.modelo || !valores.marca || !valores.numeroSerie || !valores.tipo || !valores.idCliente) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios!' })
    }

    try {
        const numeroSerieCriptografado = CryptoJS.AES.encrypt(valores.numeroSerie, CHAVE_SECRETA).toString()

        await Console.create({
            modelo: valores.modelo,
            marca: valores.marca,
            numeroSerie: numeroSerieCriptografado,
            tipo: valores.tipo,
            idCliente: valores.idCliente
        })

        return res.status(201).json({ message: 'Console cadastrado com sucesso!' })
    } catch (err) {
        console.error('Erro ao cadastrar console:', err)
        return res.status(500).json({ message: 'Erro ao cadastrar console!' })
    }
}

const listar = async (req, res) => {
    try {
        const consoles = await Console.findAll()
        let resultado = []

        consoles.forEach((el)=>{
            let numeroSerieDescriptografado = ''
            try{
                const bytes = CryptoJS.AES.decrypt(el.numeroSerie, CHAVE_SECRETA)
                numeroSerieDescriptografado = bytes.toString(CryptoJS.enc.Utf8)
            }catch(err){
                numeroSerieDescriptografado = 'Erro ao descriptografar'
                console.error(numeroSerieDescriptografado, err)
            }
            resultado.push({
                codConsole: el.codConsole,
                modelo: el.modelo,
                marca: el.marca,
                numeroSerie: numeroSerieDescriptografado,
                tipo: el.tipo,
                idCliente: el.idCliente
            })
        })

        return res.status(200).json(resultado)
    } catch (err) {
        console.error('Erro ao listar consoles:', err)
        return res.status(500).json({ message: 'Erro ao listar consoles!' })
    }
}
const consultar = async (req, res) => {
    const termo = req.params.numeroSerie

    try {
        const consoles = await Console.findAll()
        const resultado = []

        consoles.forEach((el) => {
            const numeroSerie = CryptoJS.AES.decrypt(el.numeroSerie, CHAVE_SECRETA).toString(CryptoJS.enc.Utf8)
            if (numeroSerie.includes(termo)) {
                resultado.push({
                    codConsole: el.codConsole,
                    modelo: el.modelo,
                    marca: el.marca,
                    numeroSerie: numeroSerie,
                    tipo: el.tipo,
                    idCliente: el.idCliente
                })
            }
        })

        if (!resultado.length) {
            return res.status(404).json({ message: 'Console não encontrado!' })
        }

        return res.status(200).json(resultado)
    } catch (err) {
        console.error('Erro ao consultar console:', err)
        return res.status(500).json({ message: 'Erro ao consultar console!' })
    }
}

module.exports = {cadastrar, listar, consultar}

