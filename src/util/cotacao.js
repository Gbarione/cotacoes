const request = require('request')
const api_token_aplha = require('../apikey')


//node app.js consulta --ativo BBAS3.SA      <-> Exemplo de consulta - entrar dentro da pasta cotacoes
// ALPHA API KEY: ZISH0BRNKIKA3MCY  https://www.alphavantage.co/

const cotacao = (symbol, callback) => {

    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&interval=5min&apikey=${api_token_aplha}`
    const urlSearch = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=${api_token_aplha}`

    request({ url: url, json: true }, (err, response) => {


        if (!response.body["Global Quote"] || response.body === undefined) {

            return callback({
                message: `No data found`,
                code: 404
            }, undefined)
        }
        if (err) {
            return callback({
                message: `Something went wrong`,
                code: 500
            }, undefined)
        }

            const metaData = response.body["Global Quote"]
            const symbol = metaData["01. symbol"]
            const price_open = metaData["02. open"]
            const price = metaData["05. price"]
            const day_high = metaData["03. high"]
            const day_low = metaData["04. low"]

            const data = { symbol, price_open, price, day_high, day_low }

            callback(undefined, data)
        

    })
}

module.exports = cotacao