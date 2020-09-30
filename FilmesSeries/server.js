const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const ObjectID = require('mongodb').ObjectID
const MongoClient = require('mongodb').MongoClient
const uri = "mongodb+srv://admin:0000@cluster0.j4kjs.mongodb.net/crud?retryWrites=true&w=majority"

MongoClient.connect(uri, (err, client) => {
    if(err)
    return consele.log(err)
    
    db = client.db('crud')

    app.listen(3000, function(){
        console.log('Servidor rodando na port 3000')
    })

})

app.use(bodyparser.urlencoded({extended: true}))

app.set('view engine', 'ejs')

app.get('/', function(req, res){
    res.render('home')
})

app.get('/show', function(req, res){
    db.collection('FilmesSeries').find().toArray(
        (err, results) => {
            if(err) return console.log(err)
            console.log(results)
            res.render('show', {data: results})
        }
    )
})

app.post('/show', function(req, res){
    db.collection('FilmesSeries').save(req.body, (err, resut) => {
        if(err) return console.log(err)
        
        console.log('Salvo no MongoDB')
        res.redirect('/show')
    })

})

app.route('/edit/:id')
.get((req, res) =>{
    var id = req.params.id
    db.collection('FilmesSeries').find(ObjectID(id)).toArray((err, result)=>{
        if(err) return console.log(err)

        res.render('edit', {data: result})

    })
})
.post((req, res) => {
    var id = req.params.id
    var Titulo = req.body.Titulo
    var Genero = req.body.Genero
    var Ano = req.body.Ano
    var Elenco = req.body.Elenco
    var Diretor = req.body.Diretor
    var Sinopse = req.body.Sinopse
    var Duracao = req.body.Duracao
    var Valor = req.body.Valor
    db.collection('FilmesSeries').updateOne(
        {
            _id: ObjectID(id)
        },
        {
            $set: {
                Titulo: Titulo,
                Genero: Genero,
                Ano: Ano,
                Elenco: Elenco,
                Diretor: Diretor,
                Sinopse: Sinopse,
                Duracao: Duracao,
                Valor: Valor
            }
        }, (err, result)=>{
            if(err) return console.log(err)
            console.log('Banco atualizado com Sucesso !')
            res.redirect('/show')
        }
    )
})

app.route('/delete/:id')
.get((req, res) => {
    var id = req.params.id
    db.collection('FilmesSeries').deleteOne(
        {
            _id: ObjectID(id)
        },
        (err, result) => {
            if(err) return console.log(err)
            console.log('Valor removido com sucesso !')
            res.redirect('/show')
        }
      
    )
    
})