const CryptoJS = require('crypto-js')
const CHAVE_SECRETA = 'segredo'

function authMiddleware(req, res, next) {
    const token = req.headers['authorization']

    if (!token) {
        return res.status(401).json({ message: 'Acesso negado! Token não fornecido.' })
    }

    try {
        const bytes = CryptoJS.AES.decrypt(token, CHAVE_SECRETA)
        const dadosDescriptografados = bytes.toString(CryptoJS.enc.Utf8)

        if (!dadosDescriptografados) {
            return res.status(401).json({ message: 'Token inválido!' })
        }

        const payload = JSON.parse(dadosDescriptografados)

        if (!payload || !Number.isInteger(payload.idCliente) || payload.idCliente <= 0 || !Number.isFinite(payload.expiraEm)) {
            return res.status(401).json({ message: 'Token inválido!' })
        }

        if (Date.now() >= payload.expiraEm) {
            return res.status(401).json({ message: 'Sessão expirada! Faça login novamente.' })
        }

        req.usuario = payload
        next()
    } catch (err) {
        return res.status(401).json({ message: 'Falha na autenticação do token!' })
    }
}

module.exports = authMiddleware
