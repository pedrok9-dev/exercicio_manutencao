const token = localStorage.getItem('token')
if (!token) {
    location.href = './login.html'
}

const form = document.querySelector('form')
const resposta = document.getElementById('resposta')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const valores = {
        modelo: document.getElementById('modelo').value,
        marca: document.getElementById('marca').value,
        numeroSerie: document.getElementById('numeroSerie').value,
        tipo: document.getElementById('tipo').value,
        idCliente: Number(document.getElementById('idCliente').value)
    }

    fetch('http://localhost:3000/console', {
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
        console.error('Erro ao cadastrar console:', err)
        resposta.innerHTML = '<p>Erro ao tentar conectar com o servidor.</p>'
    })
})
