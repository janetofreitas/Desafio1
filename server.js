
const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const ObjectID = require('mongodb').ObjectID
const MongoClient = require('mongodb').MongoClient
const uri = "mongodb+srv://admin:0000@cluster0.j4kjs.mongodb.net/crud?retryWrites=true&w=majority"

MongoClient.connect(uri,(err, client) => {
    if (err)
    return console.log(err)

    db = client.db('crud')

    app.listen(3000, () => {
        console.log('Servidor rodando na port 3000')
    })

})

app.use(bodyparser.urlencoded({extended: true}))

app.set('view engine', 'ejs')


app.get('/', function(req, res){
    res.render('home')
})

app.get('/show', (req, res) =>{
    db.collection('generico').find().toArray(
        (err, results) => {
            if (err) return console.log(err)
            console.log(results)
            res.render('show', {data: results})
        })
    
})
app.post('/show', function(req, res){
    db.collection('generico').save(req.body, (err, result) => {
        if (err) return console.log(err)

         console.log('Salvo no Banco de Dados')
         res.redirect('/show')

    })
})

app.route('/edit/:id').get((req, res) =>{
    var id = req.params.id
    db.collection('generico').find(ObjectID(id)).toArray(
        (err, result) =>{
            if (err) return console.log(err)
            res.render('edit', {data: result})
        })
})
.post((req, res) =>{
    var id = req.params.id
    var nome = req.body.Nome
    var genero = req.body.Genero
    var editora = req.body.Editora
    var ano = req.body.Ano
    var nmr_pag = req.body.Nmr_pag
    var autor = req.body.Autor
    var preco = req.body.Preco
    var idioma = req.body.Idioma
    db.collection('generico').updateOne(
        {
            _id: ObjectID(id)
        },
        {
            $set:{
                Nome: nome,
                Genero: genero,
                Editora: editora,
                Ano: ano,
                Nmr_pag: nmr_pag,
                Autor: autor,
                Preco: preco,
                Idioma: idioma

            }
        }, (err, result) =>{
            if (err) return console.log(err)
            console.log('Banco atualizado com sucesso!')
            res.redirect('/show')
            
        }
    )
})

app.route('/delete/:id')
.get((req, res) =>{
    var id = req.params.id
    db.collection('generico').deleteOne(
        {
            _id: ObjectID(id)
        },
             (err, result) =>{
                if (err) return console.log(err)
                console.log('Valor removido com sucesso!')
                res.redirect('/show')
             })
})

