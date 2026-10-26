const token = localStorage.getItem('token')

if (!token) {
    location.href = '../index.html'
}

const resposta = document.getElementById('resposta')
const form = document.querySelector('form')

form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const numeroSerie = document.getElementById('numeroSerie').value.trim()

    try {
        const res = await fetch(`http://localhost:3000/console/${encodeURIComponent(numeroSerie)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
        const dados = await res.json()

        if (res.status === 401) {
            localStorage.removeItem('token')
            alert(dados.message || 'Faça login novamente.')
            location.href = '../index.html'
            return
        }

        if (!res.ok) {
            resposta.textContent = dados.message || 'Erro ao consultar console.'
            return
        }

        if (!dados.length) {
            resposta.textContent = 'Nenhum console encontrado.'
            return
        }

        resposta.innerHTML = `<table>${criarThead()}${criarTbody(dados)}</table>`
    } catch (err) {
        console.error('Erro ao consultar console:', err)
        resposta.textContent = 'Erro ao conectar com o servidor.'
    }
})

function escapar(valor) {
    const elemento = document.createElement('span')
    elemento.textContent = valor ?? ''
    return elemento.innerHTML
}

function criarTbody(dados) {
    let corpo = '<tbody>'
    dados.forEach(el => {
        corpo += '<tr>'
        corpo += `<td>${escapar(el.codConsole)}</td>`
        corpo += `<td>${escapar(el.modelo)}</td>`
        corpo += `<td>${escapar(el.marca)}</td>`
        corpo += `<td>${escapar(el.numeroSerie)}</td>`
        corpo += `<td>${escapar(el.tipo)}</td>`
        corpo += `<td>${escapar(el.idCliente)}</td>`
        corpo += '</tr>'
    })
    corpo += '</tbody>'
    return corpo
}

function criarThead() {
    return `
        <thead>
            <tr>
                <th>Código</th>
                <th>Modelo</th>
                <th>Marca</th>
                <th>Número de Série</th>
                <th>Tipo de Serviço</th>
                <th>Código do Cliente</th>
            </tr>
        </thead>
    `
}
