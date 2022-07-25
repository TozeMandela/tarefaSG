((doc, win)=>{
    let btn = doc.querySelector('button.acceptBTN');
    let main  = doc.querySelector('.conteiner');
    let login = doc.querySelector('.limiter');
    let id;

    function displayMain(){
        main.style.display = 'block';
        login.style.display = 'none';
    };

    function preencheSpan(clas, valor){
        doc.querySelector(clas).innerHTML = valor;
    }

    btn.addEventListener('click', function(){
        id = this.dataset.js;
        displayMain();
        doc.querySelector('title').innerHTML = 'Tarefa';

        XhttpRequest.get(`/users/normal/add/user/tarefa/${id}`).then((d)=>{
            let da = JSON.parse(d);
            
            preencheSpan(".nome", da._name);
            preencheSpan(".email", da._email);
            preencheSpan(".dataNasc", da._birth_date);
            preencheSpan(".bi", da._bi);
            preencheSpan(".morada", da._morada);
            preencheSpan(".profissao", da._profession);

        });

        XhttpRequest.get(`/users/normal/add/user/tarefa/ta/${id}`).then((d)=>{
            let da = JSON.parse(d);
            
            da.forEach(element => {

                doc.querySelector('.divListT').appendChild(p(element))
            });
        }) 


    });

    function p (element){
        let p = doc.createElement('p');

        p.innerHTML= `Tarefa: <strong>${element._tarefa}</strong> <br/> intervalo maxímo de entrega: ${element._birth_date} |
        Nível de urgência: <strong>${element.estado}</strong> <button class="excluir" style="color: red;" 
        data-id="${element._id}">excluir</button><br/>---------------------------------------------------------
        -----------------------`;
        eventoE(p);
        return p;
    }

    function eventoE(p=null){
        
        let btnExcluir = p.querySelector('.excluir');
        btnExcluir.addEventListener('click', ()=>{
        console.log('popopo: ',btnExcluir.dataset.id)
        
        XhttpRequest.delete(`/users/delete/tarefa/${btnExcluir.dataset.id}`).then(()=>{
            console.log('tarefa excluida com sucesso');
        }).catch(er=>{
            console.log('erro ao salvar');
        })
    })
    }

})(document, window);