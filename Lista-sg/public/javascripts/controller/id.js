((doc, win)=>{
let id = localStorage.getItem('id');
let select = doc.querySelector('.listTarefa');

XhttpRequest.get(`/users/admin/add/tarefa/${id}`).then((data)=>{
    console.log('userTTTTTT: ',JSON.parse(data))
    doc.querySelector('span.hidden-xs').innerHTML = JSON.parse(data)._name;
    doc.querySelector('div.pull-left>p').innerHTML = JSON.parse(data)._name;

})

XhttpRequest.get(`/users`).then(users=>{
    let arr = JSON.parse(users);

    console.log('aa: ', users, select, arr)

    arr.forEach(user => {

        createOption(select, user._name, user._id);
    });
    
});

function createOption(se, op, value){

    se.options[se.options.length] = new Option(op, value);

}

})(document, window);