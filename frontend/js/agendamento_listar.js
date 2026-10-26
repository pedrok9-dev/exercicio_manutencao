const token = localStorage.getItem('token')

if (!token) {
    location.href = '../index.html'
}

const resposta = document.getElementById('resposta')
const form = document.querySelector('form')

form.addEventListener('submit', async (e) => {
    e.preventDefault()

    try {
        const res = await fetch('http://localhost:3000/agendamentos', {
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
            resposta.textContent = dados.message || 'Erro ao listar agendamentos.'
            return
        }

        if (!dados.length) {
            resposta.textContent = 'Nenhum agendamento cadastrado.'
            return
        }

        resposta.innerHTML = `<table>${criarThead()}${criarTbody(dados)}</table>`
    } catch (err) {
        console.error('Erro ao listar agendamentos:', err)
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
        corpo += `<td>${escapar(el.codAgendamento)}</td>`
        corpo += `<td>${escapar(el.data)}</td>`
        corpo += `<td>${escapar(el.hora)}</td>`
        corpo += `<td>${escapar(el.idCliente)}</td>`
        corpo += `<td>${escapar(el.idConsole)}</td>`
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
                <th>Data</th>
                <th>Horário</th>
                <th>Código do Cliente</th>
                <th>Código do Console</th>
            </tr>
        </thead>
    `
}
