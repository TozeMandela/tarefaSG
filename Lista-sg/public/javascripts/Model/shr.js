class XhttpRequest{

    static get(Url, params ={}){

        return XhttpRequest.Xhr('get', Url, params)
    }

    static delete(Url, params ={}){

        return XhttpRequest.Xhr('delete', Url, params)
    }

    static put(Url, params ={}){

        return XhttpRequest.Xhr('put', Url, params)
    }

    static post(Url, params ={}){

        return XhttpRequest.Xhr('post', Url, params)
    }

    static Xhr(method, url, params = {}){
       return new Promise((resolve, reject)=>{
            let obj = {};

            let ajax = new XMLHttpRequest();

            ajax.open(method.toUpperCase(), url);

            ajax.setRequestHeader('Content-Type', 'application/json');

            ajax.send(JSON.stringify(params));

            ajax.onload = (evt)=>{
                
                try {

                    obj = ajax.responseText  

                } catch (error) {

                    console.error('erro no ajax'); 
                    reject(error)

                }

                resolve(obj);

            }
            
        });

    }
}