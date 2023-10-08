export default class HttpClient{

    #urlPattern = '^http?:\/\/localhost:[0-9]{1,5}\/([-a-zA-Z0-9()@:%_\+.~#?&\/=]*)';

    #url;

    constructor(url){
       this.#setUrl(url);
    }

    #setUrl(value){

        const urlRegex = new RegExp(this.#urlPattern);

        const isUrlValid = urlRegex.test(value);

        if(!isUrlValid){
            throw new Error("Invalid url passed to HttpClient!");
        }

        this.#url = value;
    }

    get(){
        return fetch(this.#url)
                    .then(res => res.json());
    }

    post(data){
        return fetch(this.#url, {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json());
    }

    put(data, id){
       return fetch(`${this.#url}/${id}`, {
          method: 'PUT',
          headers: {
            'Content-type': 'Application/json'
          },
          body: JSON.stringify(data)
       })
        .then(res => res.json);
    }

    delete(id){
       return fetch(`${this.#url}/${id}`, {
         method: 'DELETE'
       }) 
       .then(res => res.json());
    }
}