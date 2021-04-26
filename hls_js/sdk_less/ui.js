

class UI {

    #videoElement;

    constructor() {
        this.#videoElement = document.querySelector('#video');
    }

    get videoElement (){
        return this.#videoElement;
    }
}