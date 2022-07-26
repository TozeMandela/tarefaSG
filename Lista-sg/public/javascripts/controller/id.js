((doc, win)=>{
let id = localStorage.getItem('id');

XhttpRequest.get(`/users/admin/add/tarefa/${id}`).then((data)=>{
    console.log('userTTTTTT: ',JSON.parse(data))
    doc.querySelector('span.hidden-xs').innerHTML = JSON.parse(data)._name;
    doc.querySelector('div.pull-left>p').innerHTML = JSON.parse(data)._name;

})

})(document, window);