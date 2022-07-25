class Tarefa{

    constructor(username, tarefa, data, nivelU){
        this._username = username;
        this._tarefa = tarefa;
        this._date = data;
        this._nivelUrgencia = nivelU;
    }

    get username(){
        return this._username;
    }
    set username(n){
        this._username = u;
    }

    get tarefa(){
        return this._tarefa;
    }
    set tarefa(t){
        this._tarefa = t;
    }

    get data(){
        return this._date;
    }
    set data(d){
        this._date = d;
    }

    saveDataT(obj){
        XhttpRequest.post('/users/tarefa/add', obj).then(()=>{
            console.log('tarefa salvo com sucesso!!!');
        }).catch(err=>{
            console.log('Erro ao salvar a tarefa')
        });
    }
}