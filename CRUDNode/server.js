const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const { render } = require('ejs')
const { ObjectId } = require('mongodb')
const ObjectID = require('mongodb').ObjectID
const MongoClient = require('mongodb').MongoClient
const uri = "mongodb+srv://admin:0000@cluster0.j4kjs.mongodb.net/crud?retryWrites=true&w=majority"


MongoClient.connect(uri, (err, client) => {
    if(err)
    return console.log(err)
    db = client.db('crud')
app.listen(3000, () => {
console.log('Servidor Rodando na porta 3000')
})


})


app.use(bodyparser.urlencoded({extended: true}))


app.set('view engine', 'ejs')

app.get('/' , function(req, res){
      res.render('home')

})
app.get('/show',(req, res) => {
    db.collection('roupas').find().toArray(
        (err, results) => {
            if(err)
        return console.log(err)
        console.log(results)
        res.render('show', {data: results} )

        })

    

}) 


app.post('/show' ,function(req, res)  {
    db.collection('roupas').save(req.body, (err, result) => {
        if(err)
        return console.log(err)
        console.log('Salvo no MongoDB')
        res.redirect('/show')
    })
});

app.route('/edit/:id')
.get((req, res)=> {
    var id = req.params.id
    db.collection('roupas').find(ObjectID(id)).toArray(
        (err, result)=> {
            if (err) return console.log(err)
            res.render('edit' , {data: result})

        })    
})
.post((req, res) => {
    var id = req.params.id
    var tamanho = req.body.tamanho
    var tecido = req.body.tecido
    var tipo = req.body.tipo
    var Cor = req.body.Cor
    var valor = req.body.valor
    var  marca = req.body. marca
    var coleção = req.body.coleção
    var descrição = req.body.descrição
    db.collection('roupas').updateOne(
        {
            _id: ObjectId(id)


        },
        {
            $set: {
                tamanho: tamanho,
                tecido: tecido,
                tipo: tipo,
                Cor: Cor,
                valor: valor,
                marca: marca,
                coleção: coleção,
                descrição: descrição
            }
        }, (err, result)=> {
            if (err) return console.log(err)
            res.redirect('/show')
            console.log('Banco Atualizado Com Sucesso')
        }

    )



})

app.route('/delete/:id')
.get((req, res) => {
  var id = req.params.id

  db.collection('roupas').deleteOne({_id: ObjectId(id)}, (err, result) => {
    if (err) return res.send(500, err)
    console.log('Deletado do Banco de Dados!')
    res.redirect('/show')
  })
})

