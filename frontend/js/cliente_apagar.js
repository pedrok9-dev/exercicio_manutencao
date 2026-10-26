const token = localStorage.getItem('token')

if (!token) {
    location.href = '../index.html'
}

const btn_apagar = document.getElementById('btn_apagar')
const resposta = document.getElementById('resposta')

btn_apagar.addEventListener('click', (e) => {
    e.preventDefault()

    const id = document.getElementById('id').value

    if (!id) {
        resposta.innerHTML = '<p>Informe o Código do Cliente!</p>'
        return
    }

    if (!confirm('Tem certeza que deseja excluir este cliente?')) {
        return
    }

    fetch(`http://localhost:3000/cliente/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
        .then(res => {
            if (res.status === 401) {
                localStorage.removeItem('token')
                alert('Faça login novamente, tempo expirado!')
                location.href = '../index.html'
                throw new Error('Sessão expirada')
            }
            if (!res.ok) {
                return res.json().then(dados => { throw new Error(dados.message || 'Erro na solicitação.') })
            }
            return res.json()
        })
        .then(dados => {
            resposta.innerHTML = `<p>${dados.message}</p>`
            document.querySelector('form').reset()
        })
        .catch(err => {
            console.error('Erro ao apagar cliente:', err)
            resposta.textContent = err.message === 'Failed to fetch' ? 'Erro ao conectar com o servidor.' : err.message
        })
})
