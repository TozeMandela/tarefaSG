class Users{

    constructor(name, birth_date, bi, email, morada,profession, gender,country,  adim,  passw){

        this._name = name;
        this._birth_date = birth_date; 
        this._bi = bi; 
        this._email = email; 
        this._morada = morada; 
        this._profession = profession;
        this._gender = gender;
        this._country = country;
        this._admin = adim;
        this._password = passw;

    }

    get name(){
        return this._name;
    }
    set name(n){
        this._name = n;
    }

    get birth_date (){
        return this._birth_date;
    }
    set birth_date(d){
        this._birth_date = d;
    }

    get bi (){
        return this._bi;
    }
    set bi(bi){
        this._bi = bi;
    }

    get email (){
        return this._email;
    }
    set email(em){
        this._email = em;
    }

    get morada(){
        return this._morada;
    }
    set morada(mo){
        this._morada = mo;
    }

    get profession(){
        return this._profession;
    }
    set profession(pro){
        this._profession = pro;
    }

    get gender (){
        return this._gender;
    }
    set gender(ge){
        this._gender = ge;
    }

    get adimin(){
        return this._adimin;
    }
    set admin(ad){
        this._admin = ad;
    }

    /* dados vindo da base de dados */
    static showData(){
        
        let obj;

        return XhttpRequest.get('/users').then(datas=>{
            
           return obj = JSON.parse(datas);
             
        }).catch(err=>{
            console.log('Erro ao pegar os dados!!! ',err);
        });

    }
    
    saveData(obj){

        XhttpRequest.post('/users', obj).then(()=>{
            console.log('enviado')
        });

    }

}