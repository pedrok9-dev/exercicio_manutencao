const token = localStorage.getItem('token')
const nome = localStorage.getItem('nomeCliente')

const clienteLogado = document.getElementById('cliente_logado')
const boasVindas = document.getElementById('boas_vindas')
const btn_logout = document.getElementById('btn_logout')

if (token && nome) {
    clienteLogado.textContent = `Cliente: ${nome}`
    boasVindas.textContent = `Bem-vindo(a), ${nome}!`
} else {
    btn_logout.style.display = 'none'
}

btn_logout.addEventListener('click', (e) => {
    e.preventDefault()
    localStorage.removeItem('token')
    localStorage.removeItem('nomeCliente')
    location.href = './html/login.html'
})
