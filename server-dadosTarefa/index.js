const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
require('./bd');
const users = mongoose.model('Users');
const tarefa = mongoose.model('Tarefas')

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/tarefaSG').then(()=>{
    console.log('full connection.');
}).catch(e=>{
    console.log('erro ao conectar o banco');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/* get */
app.get('/users', (req,res)=>{

    users.find().then(dados=>{
        res.send(dados);
    })

});

app.get('/users/create/user/add', (req,res)=>{

    users.find().then(dados=>{
        res.send(dados);
    })

});

app.get('/users/admin/add/tarefa/:id', (req,res)=>{

    users.findOne({_id: req.params.id}).then(dados=>{
        res.send(dados)
    })
});

app.get('/users/:email/:pass', (req,res)=>{

    let email = req.params.email;
    let pass = req.params.pass;

    users.find({_email: email, _password: pass}).then(dados=>{
        
       res.send(dados)
        
    }).catch(e=>{
        console.error('Erro ao pesquisar',e);
    });
});

app.get('/users/normal/add/user/tarefa/:id', (req, res)=>{
    
    users.findOne({_id:req.params.id}).then(d=>{
        res.send(d);
    }).catch(e=>{
        console.error('Erro ao exibir a tarefa',e);
    });
});

app.get('/users/normal/add/user/tarefa/ta/:id', (req, res)=>{
    
    tarefa.find({_username:req.params.id}).then(d=>{
        res.send(d);
    }).catch(e=>{
        console.error('Erro ao exibir a tarefa',e);
    });
});
/* Post */
app.post('/users', (req, res)=>{

  new users({

        _name: req.body._name,
        _birth_date: req.body._birth_date,
        _bi: req.body._bi,
        _email: req.body._email,
        _morada: req.body._morada,
        _profession: req.body._profession,
        _gender: req.body._gender,
        _country: req.body._country,
        _admin: req.body._admin,
        _password: req.body._password

    }).save().then(()=>{

        console.log('cadastro feito com sucesso!');

    }).catch(e=>{

        console.log('Erro ao salvar... ', e);
    });  
});

app.post('/users/tarefa/add', (req, res)=>{


    console.log('Angola: ',req.body);
    new tarefa({

        username:req.body._username,
        _tarefa: req.body._tarefa,
        _birth_date: req.body._date,
        estado: req.body._nivelUrgencia

    }).save().then(()=>{
        console.log('tarefa salva com sucesso!!!');
    }).catch(err=>{
        console.error('erro ao salvar a tarefa... ', err)
    }); 

})

/* delete */
app.delete('/users/delete/:id',(req, res)=>{
    console.log(req.params.id)
    users.remove({_id: req.params.id}).then(()=>{
        console.log('usuario eliminado com sucesso!')
    }).catch((e)=>{
        console.log('erro ao eliminar usuario')
    });
});

app.delete('/users/delete/tarefa/:id',(req, res)=>{
    console.log(req.params.id)
    tarefa.remove({_id: req.params.id}).then(()=>{
        console.log('usuario eliminado com sucesso!')
    }).catch((e)=>{
        console.log('erro ao eliminar usuario')
    });
})
/* servidor... */
app.listen(4000, ()=>{
    console.log('servidor tarefasSG rodando...');
})
