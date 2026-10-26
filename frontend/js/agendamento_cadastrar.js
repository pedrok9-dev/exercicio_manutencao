const token = localStorage.getItem('token')
if (!token) {
    location.href = './login.html'
}

const form = document.querySelector('form')
const resposta = document.getElementById('resposta')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const valores = {
        data: document.getElementById('data').value,
        hora: document.getElementById('hora').value,
        idCliente: Number(document.getElementById('idCliente').value),
        idConsole: Number(document.getElementById('idConsole').value)
    }

    fetch('http://localhost:3000/agendamento', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(valores)
    })
    .then(async res => {
        const dados = await res.json()
        resposta.textContent = dados.message
        if (res.status === 401) {
            localStorage.removeItem('token')
            alert(dados.message || 'Faça login novamente.')
            location.href = './login.html'
            return
        }
        if (res.ok) form.reset()
    })
    .catch(err => {
        console.error('Erro ao cadastrar agendamento:', err)
        resposta.textContent = 'Erro ao tentar conectar com o servidor.'
    })
})
