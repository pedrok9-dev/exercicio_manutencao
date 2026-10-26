const token = localStorage.getItem('token')

if (!token) {
    location.href = '../index.html'
}

const form = document.querySelector('form')
const resposta = document.getElementById('resposta')

form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const id = document.getElementById('id').value
    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
        resposta.textContent = 'Informe um código de cliente válido.'
        return
    }

    const valores = {}
    for (const campo of ['nome', 'email', 'senha', 'cpf', 'telefone']) {
        const valor = document.getElementById(campo).value
        if (valor.trim()) valores[campo] = campo === 'senha' ? valor : valor.trim()
    }

    if (!Object.keys(valores).length) {
        resposta.textContent = 'Preencha pelo menos um campo para atualizar.'
        return
    }

    try {
        const res = await fetch(`http://localhost:3000/cliente/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(valores)
        })
        const dados = await res.json()

        if (res.status === 401) {
            localStorage.removeItem('token')
            alert(dados.message || 'Faça login novamente.')
            location.href = '../index.html'
            return
        }

        resposta.textContent = dados.message || 'Não foi possível atualizar o cliente.'
        if (res.ok) form.reset()
    } catch (err) {
        console.error('Erro ao atualizar cliente:', err)
        resposta.textContent = 'Erro ao tentar conectar com o servidor.'
    }
})
