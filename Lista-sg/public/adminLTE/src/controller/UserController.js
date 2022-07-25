class UserController {

    constructor( formIdCreate, formIdUpdate, IdTableBody ){

        this.formId = document.getElementById(formIdCreate);
        this.formUpdate = document.getElementById(formIdUpdate);
        this.IdTableBody = document.getElementById(IdTableBody);
        this.onEdit();
        this.showDisplayStorage();

    }

    onEdit(){
        
         document.querySelector('#form-user-update .btn-cancel').addEventListener('click', e =>{
            this.DisplayPainelUsers();
        });

        this.formUpdate.addEventListener('submit', e =>{  
            e.preventDefault();
            let btn = this.formUpdate.querySelector('[type=submit]');
            btn.disable=true;

            let dataUser = this.getValuesForm(this.formUpdate);

            let index = this.formUpdate.dataset.trIndex;

            let tr = this.IdTableBody.rows[index];
            
            let Userold = JSON.parse(tr.dataset.User);
            let result = Object.assign({}, Userold, dataUser);

        this.getPhoto(this.formUpdate).then((content)=>{
            if(!dataUser.photo){ 
                result._photo = Userold._photo;
            }else{
                result._photo = content;
                console.log('photo 2')
            }
            let user = new User();
            console.log('photo 3')
            user.loadFromJson(result);
            this.AddTr(user,tr);
            user.SaveStorage();
               
        },(err)=>{
            console.error(err);
        });
           
            
            this.setNumberUsersRegister();
            this.formUpdate.reset();

            btn.disable=false;
            this.DisplayPainelUsers();
        });
        
    }

    showDisplayStorage(){
        let users = new User();
        let aux = users.existValueSestorage();
        aux.forEach(element => {
            let user = new User();
            user.loadFromJson(element);
            this.addLine(user);
        });
    }
    onSubmit(){

        this.formId.addEventListener('submit', e => {
            e.preventDefault(); 
            let btn = this.formId.querySelector('[type=submit]');
            btn.disable = true;
            
            // a gente pos os dados na variavel para podermos sobescrever o dados da photo que ira receber
            //outra informação
            let dataUser = this.getValuesForm(this.formId);

            this.getPhoto(this.formId).then((content)=>{
                
                dataUser.photo = content;
                     
                dataUser.SaveStorage();
                this.addLine(dataUser);
                this.formId.reset();
                btn.disable=false;

            }, (err)=>{
     
                console.error(err);

            });
            
            
        });
    }

    isUser(){
        let aux;
        let user = [...this.formId.elements].forEach(item =>{

            if(item.name == 'name'){
                 aux = item.value;
            }
        });
        return aux;
    }

    getPhoto(formId){
        console.log('photos')
        return new Promise((resolve,reject)=>{
            
            let fileReader = new FileReader();
            let filterElementsPhoto = [...formId.elements].filter(item =>{
            if(item.name == 'photo'){
                return item;
            }
        });

        let file = filterElementsPhoto[0].files[0];
        fileReader.onload = ()=>{

            resolve(fileReader.result);            
        };
        fileReader.onerror= ()=>{
            reject(e);
        };
        
        if(file){
            fileReader.readAsDataURL(file);
        }else if(this.isUser()!==''){
            resolve('src/img/iconPhoto.png');
        }
        
        })
       
    }

    getValuesForm(formId){

        let isValidForm = true;

        let user = {};
        [...formId.elements].forEach((field, index)=>{
            if(['name', 'email', 'password'].indexOf(field.name)>-1 && !field.value){  
                field.parentElement.classList.add('has-error');
                isValidForm=false;
            }
            if(field.name==='gender'){
                if(field.checked){
                    user[field.name] = field.value
                }
                
            }else if(field.name==='admin'){
                if(field.checked){
                    
                    user[field.name]='sim';
    
                }else{
    
                    user[field.name] = 'não';
                }
            }else {
                user[field.name] = field.value;
            }
            
        })
        if(!isValidForm){ return false}

            return  new User(user.name,
                user.gender, 
                user.email, 
                user.country,
                user.admin, 
                user.birth, 
                user.password, 
                user.photo );
        
        
    }

    addZeros(number){ 
        return number<10 ? `0${number}`: number;
    }

    /*UpdateValueSestorage(index, json){
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

    addStorage(json){
        let users = this.existValueSestorage()
        users.push(json);
        //sessionStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('users', JSON.stringify(users))

    }*/

    addLine(dataUser){

        let tr = this.AddTr(dataUser);

        this.IdTableBody.appendChild(tr);
        this.setNumberUsersRegister();
    }

    AddTr(dataUser, tr = null){

        if(tr===null) tr = document.createElement('tr');
        tr.dataset.User = JSON.stringify(dataUser);

        tr.innerHTML= ` 
        <td>
        <img src="${dataUser.photo}" style="max-height: 50px;">
        </td>
        <td>${dataUser.name}</td>
        <td>${dataUser.email}</td>
        <td>${dataUser.admin}</td>
        <td>${Utils.DateFormat(dataUser.register, this.addZeros)}</td>
        <td>
          <button type="button" class="btn btn-primary btn-edit btn-xs btn-flat">Editar</button>
          <button type="button" class="btn btn-danger btn-delite btn-xs btn-flat">Excluir</button>
        </td>
      `;
     
      
      this.EventesTr(tr);

        return tr;
    }

    EventesTr(tr){
        tr.querySelector('.btn-delite').addEventListener('click', e =>{
            if(confirm('deseja realmente excluir...')){

                let index=tr.sectionRowIndex;
                tr.remove();
                this.remuveValueStorage(index)
                this.setNumberUsersRegister();
                
            }
        });
        tr.querySelector('.btn-edit').addEventListener('click', e =>{
            let json = JSON.parse(tr.dataset.User);

            this.formUpdate.dataset.trIndex = tr.sectionRowIndex;

            for (let name in json) {
                let field = this.formUpdate.querySelector('[name='+name.replace('_',''));

                if (field) {
                     switch(field.type){
                         case 'file':
                             continue;
                         break;

                         case 'checkbox':
                             if(json[name]==='sim'){
                                 field.checked = json[name];
                             }else{
                                 field.checked = false;
                             }
                         break;
                         case 'radio':
                             field = this.formUpdate.querySelector('[name='+name.replace('_','')+'][value='+json[name]+']');
                             if(field.value==='M' || field.value==='F'){
                                 field.checked = true;
                             }
                         break;
                         default:
                             field.value = json[name];
                     }
                }
            }
            this.formUpdate.querySelector('.foto-perfil').src=json._photo;
            this.DisplayPainelUpdate();
        });
    }

    DisplayPainelUsers(){ 
        document.querySelector('#box-user-create').style.display='block';
        document.querySelector('#box-user-update').style.display='none'; 

    }

    DisplayPainelUpdate(){ 
        document.querySelector('#box-user-create').style.display='none';
        document.querySelector('#box-user-update').style.display='block'; 

    }

    setNumberUsersRegister(){
        let NumberUser = 0;
        let numberAdmin = 0;
        [...this.IdTableBody.children].forEach((tr)=>{
          let user = JSON.parse(tr.dataset.User);
          if(user._admin==='sim'){
              numberAdmin += 1
          }
            NumberUser += 1;
        });

        document.getElementById('number-users').innerHTML = NumberUser;
        document.getElementById('number-users-admin').innerHTML = numberAdmin;

    }
}

