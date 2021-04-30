

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

    print(eventType, message, alertType){
        const listItem = document.createElement('li');
        const timeContainer = document.createElement('span');
        const eventContainer = document.createElement('span');
        const messageContainer = document.createElement('span');
        timeContainer.innerText = this.formatTime();
        listItem.appendChild(timeContainer);
        eventContainer.innerText = eventType;
        listItem.appendChild(eventContainer);
        messageContainer.innerText = message;
        listItem.appendChild(messageContainer);
        listItem.className = 'log-line';
        this.#caracteristicsElement.appendChild(listItem);
    }

    formatTime(){
        let logTime = new Date();
        logTime = logTime.toTimeString();
        return logTime.substring(0, logTime.indexOf('GMT') - 1);
    }
}