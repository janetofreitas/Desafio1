
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
    res.render('menu')
})

// -------------------- Departamento de Livro --------------------------------

app.get('/home', function(req, res){
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

// -------------------- FIM ------------------------------

// -------------------- Departamento de Filmes/Series --------------------------------

app.get('/homeF/', function(req, res){
    res.render('homeF')
})

app.get('/showF/', function(req, res){
    db.collection('FilmesSeries').find().toArray(
        (err, results) => {
            if(err) return console.log(err)
            console.log(results)
            res.render('showF', {data: results})
        }
    )
})

app.post('/showF/', function(req, res){
    db.collection('FilmesSeries').save(req.body, (err, resut) => {
        if(err) return console.log(err)
        
        console.log('Salvo no MongoDB')
        res.redirect('/showF')
    })

})

app.route('/editF/:id')
.get((req, res) =>{
    var id = req.params.id
    db.collection('FilmesSeries').find(ObjectID(id)).toArray((err, result)=>{
        if(err) return console.log(err)

        res.render('editF', {data: result})

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
            res.redirect('/showF')
        }
    )
})

app.route('/deleteF/:id')
.get((req, res) => {
    var id = req.params.id
    db.collection('FilmesSeries').deleteOne(
        {
            _id: ObjectID(id)
        },
        (err, result) => {
            if(err) return console.log(err)
            console.log('Valor removido com sucesso !')
            res.redirect('/showF')
        }
      
    )
})
    // -------------------- Departamento de Roupas --------------------------------

    app.get('/homeR' , function(req, res){
        res.render('homeR')
  
  })
  app.get('/showR',(req, res) => {
      db.collection('roupas').find().toArray(
          (err, results) => {
              if(err)
          return console.log(err)
          console.log(results)
          res.render('showR', {data: results} )
  
          })
  
      
  
  }) 
  
  
  app.post('/showR' ,function(req, res)  {
      db.collection('roupas').save(req.body, (err, result) => {
          if(err)
          return console.log(err)
          console.log('Salvo no MongoDB')
          res.redirect('/showR')
      })
  });
  
  app.route('/editR/:id')
  .get((req, res)=> {
      var id = req.params.id
      db.collection('roupas').find(ObjectID(id)).toArray(
          (err, result)=> {
              if (err) return console.log(err)
              res.render('editR' , {data: result})
  
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
              _id: ObjectID(id)
  
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
              res.redirect('/showR')
              console.log('Banco Atualizado Com Sucesso')
          }
  
      )
  
  
  
  })
  
  app.route('/deleteR/:id')
  .get((req, res) => {
    var id = req.params.id
  
    db.collection('roupas').deleteOne({_id: ObjectID(id)}, (err, result) => {
      if (err) return res.send(500, err)
      console.log('Deletado do Banco de Dados!')
      res.redirect('/showR')
    })
})

// -------------------- Departamento de Eletrônicos --------------------------------

app.get('/homeE', function(req, res){
    res.render('homeE')
})

app.get('/showE/', function(req, res){
    db.collection('eletronicos').find().toArray(
        (err, results) => {
            if(err) return console.log(err)

            console.log(results)
            res.render('showE', {data: results})
        }
    )
})

app.post('/showE/', function(req, res){
    db.collection('eletronicos').save(req.body, (err, result) => {
        if(err) return console.log(err)

            console.log('Salvo no MongoDB')
            res.redirect('/showE')
    })
})

app.route('/editE/:id')
  .get((req, res)=> {
      var id = req.params.id
      db.collection('eletronicos').find(ObjectID(id)).toArray(
          (err, result)=> {
              if (err) return console.log(err)
              res.render('editE' , {data: result})
  
          })    
  })
.post((req, res) => {
    var id = req.params.id
    var nome = req.body.nome
    var marca = req.body.marca
    var valor = req.body.valor
    var cor = req.body.cor
    var voltagem = req.body.voltagem
    var descricao = req.body.descricao
    var garantia = req.body.garantia
    var modelo = req.body.modelo

    db.collection('eletronicos').updateOne(
        {
            _id: ObjectID(id)
        },
        {
            $set: {
                nome: nome,
                marca: marca,
                valor: valor,
                cor: cor,
                voltagem: voltagem,
                descricao: descricao,
                garantia: garantia,
                modelo: modelo
            }
        }, (err, result)=>{
            if(err) return console.log(err)

            console.log('Banco atualizado com sucesso!')
            res.redirect('/showE')
        }
    )
})

app.route('/deleteE/:id')
.get((req, res) =>{
    var id = req.params.id
    db.collection('eletronicos').deleteOne(
        {
            _id: ObjectID(id)
        },
             (err, result) =>{
                if (err) return console.log(err)
                console.log('Valor removido com sucesso!')
                res.redirect('/showE')
             })
})



