const form = document.querySelector('form')
const resposta = document.getElementById('resposta')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const email = document.getElementById('email').value.trim()
    const senha = document.getElementById('senha').value

    const valores = {
        email: email,
        senha: senha
    }

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(valores)
    })
        .then(async res => {
            const dados = await res.json()
            resposta.textContent = dados.message
            if (res.ok && dados.token) {
                localStorage.setItem('token', dados.token)
                localStorage.setItem('nomeCliente', dados.nome)
                location.href = '../index.html'
            }
        })
        .catch(err => {
            console.error('Erro no login:', err)
            resposta.innerHTML = `<p>Erro ao tentar conectar com o servidor.</p>`
        })
})
