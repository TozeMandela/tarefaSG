class User {

    constructor(name, gender, email, country, admin, birth, password, photo){
        this._id;
        this._name = name;
        this._gender = gender;
        this._email = email;
        this._country = country;
        this._admin = admin;
        this._birth = birth;
        this._password = password;
        this._photo = photo;
        this._register = new Date();

    }

    get id(){
        return this._id;
    }
    set id(id){
        this._id = id;
    }

    get name(){
        return this._name;
    }
    set name(name){
        this._name = name;
    }

    get admin(){
        return this._admin;
    }
    set admin(admin){
         this._admin = admin;
    }

    get birth(){
        return this._birth;
    }
    set birth(birth){
        this._birth = birth;
    }

    get country(){
        return this._country;
    }
    set country(country){
       this._country = country;
    }

    get email(){
        return this._email;
    }
    set email(email){
        this._email = email;
    }

    get gender(){
        return this._gender;
    }
    set gender(gender){
        this._gender = gender;
    }

    get password(){
        return this._password;
    }
    set password(password){
        this._password = password;
    }

    get photo(){
        return this._photo;
    }
    set photo(photo){
        this._photo = photo;
    }

    get register(){
        return this._register;
    }
    set register(register){
        this._register = register;
    }
    loadFromJson(json){
       for (let Name  in json) {
           switch(Name){
                case '_register':
                    this[Name] = new Date(json[Name]);  
                break;
                default:
                    this[Name] = json[Name];
                break;
           }
            
        }
    }

    UpdateValueSestorage(index, json){
        let users = [];
        
        if(localStorage.getItem('users')){
            users = JSON.parse(localStorage.getItem('users'));
            users[index]=json;
        }
        localStorage.setItem('users', JSON.stringify(users))
    }

    remuveValueStorage(index){
        let users = [];

        if(localStorage.getItem('users')){
            users = JSON.parse(localStorage.getItem('users'));
            users.splice(index,1);
        }

        localStorage.setItem('users', JSON.stringify(users))
    }

    existValueSestorage(){
        let users = [];
        
        if(localStorage.getItem('users')){
            users = JSON.parse(localStorage.getItem('users'));
        }

        return users;
    }

    selectAllDataStorage(){
        let dataUser = this.existValueSestorage();
        dataUser.forEach(element => {
            let user = new User();

            user.loadFromJson(element);

            this.addLine(user)
        });

    }

    getNewId(){
        if(!window.id) window.id = 0;
        id ++;
        return id;
    }

    SaveStorage(json){

        let users = this.existValueSestorage();

        if(this.id>0){
           users = users.map(u => {
               if(u._id===this.id){
                u = this;
               } 

               return u;
            });
        }else{
            this._id = this.getNewId();
            users.push(this);
        }

        
        localStorage.setItem('users', JSON.stringify(users))
    }
    

}