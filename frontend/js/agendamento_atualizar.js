const token = localStorage.getItem('token')
if (!token) {
    location.href = './login.html'
}

const form = document.querySelector('form')
const resposta = document.getElementById('resposta')

form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const id = document.getElementById('id').value
    const valores = {}
    for (const campo of ['data', 'hora', 'idCliente', 'idConsole']) {
        const valor = document.getElementById(campo).value
        if (valor) {
            valores[campo] = campo === 'idCliente' || campo === 'idConsole' ? Number(valor) : valor
        }
    }

    if (!Object.keys(valores).length) {
        resposta.textContent = 'Preencha pelo menos um campo para atualizar.'
        return
    }

    try {
        const res = await fetch(`http://localhost:3000/agendamento/${id}`, {
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
            location.href = './login.html'
            return
        }

        resposta.textContent = dados.message || 'Não foi possível atualizar o agendamento.'
        if (res.ok) form.reset()
    } catch (err) {
        console.error('Erro ao atualizar agendamento:', err)
        resposta.textContent = 'Erro ao tentar conectar com o servidor.'
    }
})
