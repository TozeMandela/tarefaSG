const mongoose = require('mongoose');

const Users = mongoose.Schema({
    _name: {
        type: String,
        require: true
    },
    _birth_date: {
        type: Date,
        require: true
    },
    _bi: {
        type: String,
        require: true
    },
    
    _email: {
        type: String,
        require: true
    },
    _morada: {
        type: String,
        require: true
    },
    
    _profession: {
        type: String,
        require: true
    },
    _gender: {
        type: String,
        require: true
    },
    _country: {
        type: String,
        require: true
    },
    _admin: {
        type: String,
        require: true
    },
    _password: {
        type: String,
        require: true
    }
});

mongoose.model('Users',Users);
const tbl = mongoose.model('Users')

/* new tbl({
    _name:'Tozé Mandela',
    _birth_date:'2002-07-05',
    _bi: '',
    _email: 'mandelajunior10@gmail.com',
    _morada: 'Luanda/Gamek',
    _profession: 'PROGRAMADOR JR',
    _gender: 'M',
    _country: 'Angola',
    _admin: 'No admin',
    _password: '12345'
}).save().then(()=>{
    console.log('cadastro feito com sucesso!');
}).catch(e=>{
    console.log('Erro ao salvar... ', e);
}) */

const Tarefas = mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        require: true
    },
    _tarefa: {
        type: String,
        require: true
    },
    _birth_date: {
        type: Date,
        default: Date.now()
    },
    estado: {
        type: String,
        require: true
    }
});

mongoose.model('Tarefas',Tarefas);