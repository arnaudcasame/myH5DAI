

class UI {

    #videoElement;
    #caracteristicsElement;

    constructor() {
        this.#videoElement = document.querySelector('#video');
        this.#caracteristicsElement = document.querySelector('#caracteristics');
    }

    get videoElement (){
        return this.#videoElement;
    }

    get caracteristicsElement (){
        return this.#caracteristicsElement;
    }
}