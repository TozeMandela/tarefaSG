class Login {

    constructor(formId, div, btnSub, dinN){

        this.formLogin = document.querySelector(formId);
        this.divSubmit = document.querySelector(div);
        this.divSubmit2 = document.querySelector(dinN);
        this.btnSubmit = document.querySelector(btnSub);
        this.onSubmit();
        
    }

    onSubmit(){
        let _this = this;
        this.formLogin.addEventListener('submit',event=>{
            event.preventDefault();
            this.addValues()
        })
        document.addEventListener('keydown',function(event){
            if(event.keyCode==13){
                event.preventDefault();
                _this.addValues()

            }
        })
    }
    

    addValues = function(){
        let obj = {};

        [...this.formLogin].forEach(element => {

            if(element.value){

                obj[element.name] = element.value;
            }

        });

        this.getValues(obj.email, obj.pass, obj);

    }

    getValues(email, senha, obj){
        
        XhttpRequest.get(`/users/${email}/${senha}`).then((d)=>{

            if(JSON.parse(d).length!==0){
                
                if(JSON.parse(d)[0]._admin=='admin'){

                    this.divSubmit.style.display = 'block';

                }else if(JSON.parse(d)[0]._admin=='no admin'){

                    this.divSubmit2.style.display = 'block';
                    this.divSubmit2.querySelector('button.acceptBTN').setAttribute('data-js',`${JSON.parse(d)[0]._id}`)
                }
            }else{
                alert('dados de acesso negado')
            }
        }).catch((e)=>{
            console.log('dados do eee: ')
        })
    }
}