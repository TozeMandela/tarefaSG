class controlUser{

    constructor(formID, tableID, formT, formTa){

        this.formUser = document.getElementById(formID);
        this.tableID = document.getElementById(tableID);
        this.formTarefa = document.getElementById(formTa);
        this.formTarefa1 = document.getElementById(formT);
        
        this.onclick();
        this.showData();
        
        
    }

    onclick(){

        this.formUser.addEventListener('submit', (evt)=>{
            evt.preventDefault();

            if(this.addValues(this.formUser)==undefined){ 
                return;
            }else{
                if(this.addValues(this.formUser)._email){

                    new Users().saveData(this.addValues(this.formUser));
                    
                }
            }
        });

        this.formTarefa.addEventListener('submit', (evt)=>{
            evt.preventDefault();

            if(this.addValues(this.formTarefa)==undefined){ 
                return;
            }else{
                
                if(this.addValues(this.formTarefa)._tarefa){

                    new Tarefa().saveDataT(this.addValues(this.formTarefa));

                }
            }
        });
    }

    showQtdAdmin(dados){
        let adm = 0;
        let Noadm = 0;
        dados.forEach(element => {
            if(element._admin.toLocaleLowerCase()==='admin') adm+=1;
            if(element._admin.toLocaleLowerCase()==='no admin') Noadm+=1;
        });

        document.querySelector('.inner>#number-users-admin').innerHTML = adm;
        document.querySelector('.inner>#number-users').innerHTML = Noadm;
    }

    showData(){

        let obj;

        obj = Users.showData();

        obj. then(d=>{

            this.showQtdAdmin(d);

            d.forEach(da => {
                this.addLine(da)
            });         
        })
    }

    addLine(dataUser){

        let tr = this.addtr(dataUser);
        this.tableID.appendChild(tr);
    }

    addtr(element, tr=null){
         
        if(tr===null) tr = document.createElement('tr');

        tr.innerHTML=`<td>${element._name}</td>
        <td>${element._email}</td>
        <td>${element._profession}</td>
        <td>${element._gender}</td>
        <td>${element._admin}</td>
        <td><button class="btn btn-success btn-edit btn-xs btn-flat" data-id ="${element._id}">add ta</button> 
        <button class="btn btn-danger btn-delite btn-xs btn-flat" id="del" data-id = "${element._id}">
        excluir</button></td>`; 

        this.EventosTr(tr)
        return tr;
    }

    DisplayPainelUsers(){ 
        document.querySelector('#form-user-create').style.display='block';
        document.querySelector('#box-Tarefa').style.display='none'; 
        

    }

    DisplayPainelTarefas(){ 
        document.querySelector('#box-user-create').style.display='none';
        document.querySelector('#box-Tarefa').style.display='block'; 

    }

    EventosTr(tr){
        tr.querySelector('#del').addEventListener('click', function(e){
            if(confirm('deseja realmente excluir...')){
                
                let index=tr.sectionRowIndex;
                console.log('ind: ',index, this.dataset.id)
                tr.remove();
                XhttpRequest.delete(`/users/delete/${this.dataset.id}`).then(()=>{
                    this.showData();
                    alert('usuario eliminado com sucesso...')
                    
                })
            }
        });

        tr.querySelector('.btn-edit').addEventListener('click', function(e){
            document.querySelector('#box-user-create').style.display='none';
            document.querySelector('#box-Tarefa').style.display='block'; 
            // tbl.style.display='block';

            XhttpRequest.get(`/users/admin/add/tarefa/${this.dataset.id}`).then(d=>{
                document.querySelector('input[name="name1"]').value = JSON.parse(d)._name;
                document.querySelector('input[name="id_name1"]').value = JSON.parse(d)._id;
            });
              
        });
    }

    formValidator(formUser){
        let a = [];
        [...formUser.elements].forEach(element => {

            if(element.name==='name'|| element.name==='email' || element.name==='password'|| element.name == 'tarefa1'){
               
                if(!element.value || element.value==undefined){

                    a.push(false);
                   
                }
            }
        });

        return a[0];
    }
    addValues(formUser) {
        
        let validForm = this.formValidator(formUser)==undefined ? true:false;
        let user = {};

        [...formUser.elements].forEach(element => {
            
            if(element.name=='gender'){

                if(element.checked){
                    user[element.name] = element.value;
                }

            }else if(element.name == 'admin'){
                
                if(element.checked){
                    user[element.name] = 'admin'.toLocaleLowerCase()
                }else{
                    user[element.name] = 'NO admin'.toLocaleLowerCase()
                }

            }else{
                user[element.name]=element.value;
            }
        });

        if(!validForm){ 
             alert('preencha todos os campos...')
             return;
            }else{
                
            if(user.email){
                return new Users(
                    user.name,
                    user.birth,
                    user.bi,
                    user.email,
                    user.morada, 
                    user.profission,
                    user.gender,
                    user.country,
                    user.admin,
                    user.password
                ); 
            }

            if(user.tarefa1){
               return new Tarefa(
                    user.id_name1,
                    user.tarefa1,
                    user.date1,
                    user.estado1
                )
                
            }
         }
       
    }
}