console.log('javascript no frontend')


const cotacoesForm = document.querySelector('form')
const mainMessage = document.querySelector('#mainMessage')
const price_open = document.querySelector('#price_open')
const price = document.querySelector('#price')
const day_high = document.querySelector('#day_high')
const day_low = document.querySelector('#day_low')


cotacoesForm.addEventListener('submit', (event) => {
    event.preventDefault()
    mainMessage.innerText = 'Buscando...'
    price_open.innerText = `Price Open: 0.00`
    price.innerText = `Price: 0.00`
    day_high.innerText = `Day High: 0.00`
    day_low.innerText = `Day Low: 0.00`
    const ativo = document.querySelector('input').value
    console.log('Ativo: ' + ativo)

    if (!ativo) {
        mainMessage.innerText = 'O ativo deve ser informado'
        return;
    }


    fetch(`/cotacoes?ativo=${ativo}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                mainMessage.innerText = 'Alguma coisa deu errado'
                price_open.innerText = `ERR.: ${data.error.message} | COD.: ${data.error.code}`
                price.innerText = ``
                day_high.innerText = ``
                day_low.innerText = ``
            } else {
                mainMessage.innerHTML = `${data.symbol}`
                price_open.innerText = `Price Open: ${data.price_open}`
                price.innerText = `Price: ${data.price}`
                day_high.innerText = `Day High: ${data.day_high}`
                day_low.innerText = `Day Low: ${data.day_low}`
            }
        })
    })
})