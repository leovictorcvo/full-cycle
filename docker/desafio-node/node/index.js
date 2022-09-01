const express = require('express')
const mysql = require('mysql')

const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};

const insereVisita = () => {
    const connection = mysql.createConnection(config)

    const sql = `INSERT INTO logs(description) values('Visita - ${new Date().toISOString()}')`
    connection.query(sql)
    connection.end()    
}

const obtemVisitas = (res) => {
    let html = `
    <h1>Full Cycle</h1>
    <p>Visitas cadastradas na base do MySQL</p>
    <hr>
    `
    const connection = mysql.createConnection(config)
    const sql = 'SELECT description FROM logs'
    connection.query(sql, (err, data) => {
        if (err) {
            res.status(500).send({message: err.message})
        } else {
            html += '<ul>'
            data.forEach(log => {
                html += `<li>${log.description}</li>`
            })
            html += '</ul>'
            res.send(html)
        }        
    })

    connection.end()
}

app.get('/', async (req,res) => {
    insereVisita()
    obtemVisitas(res)
})

app.listen(port, ()=> {
    console.log(`Rodando na porta ${port}`)
})