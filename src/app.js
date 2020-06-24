const path = require('path')
const express = require('express')
const hbs = require('hbs')
const cotacoes = require('./util/cotacao')

//nodemon src/app.js -e js,hbs

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Bem-vindo ao sistema de cotações',
        author: 'Gustavo Barione'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Sobre',
        author: 'Gustavo Barione'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Ajuda',
    })
})

app.get('/cotacoes', (req, res) => {

    if (!req.query.ativo) {
        return res.status(400).json({
            error: {
                message: 'O ativo deve ser informado!',
                code: 400
            }
        })
    }

    const symbol = req.query.ativo.toUpperCase()

    cotacoes(symbol, (err, body) => {
        if (err) {
            return res.status(err.code).json({
                error: {
                    message: err.message,
                    code: err.code
                }
            })
        }
        console.log(body)
        res.status(200).send(body)

    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        author: 'Gustavo Barione',
        errorMessage: 'Pagina não encontrada após /help'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        author: 'Gustavo Barione',
        errorMessage: 'Pagina não encontrada'
    })
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`server is up on port ${port}`)
})