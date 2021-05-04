

class UI {

    #videoElement;
    #tabButtonElements;
    #tabElements;
    #caracteristicsElement;
    #realTimeMetricsElement;

    constructor() {
        this.#videoElement = document.querySelector('#video');
        this.#caracteristicsElement = document.querySelector('#caracteristics');
        this.#realTimeMetricsElement = document.querySelector('#real-time-metrics');
        this.#tabButtonElements = document.querySelectorAll('.tab');
        this.#tabElements = document.querySelectorAll('.console');
        this.#tabButtonElements.forEach((element, i) => {
            element.addEventListener('click', this.onTabButtonClicked.bind(this));
        });
        this.#tabElements.forEach((element, i) => {
            if(i !== 0){
                element.style.display = 'none';
            }
        });
    }

    get videoElement (){
        return this.#videoElement;
    }

    get caracteristicsElement (){
        return this.#caracteristicsElement;
    }

    onTabButtonClicked(e){
        this.#tabElements.forEach((element, i) => {
            element.style.display = 'none';
        });
        switch (e.target.innerText) {
            case 'Caracteristics':
                this.#tabElements[0].style.display = 'block';
                break;
            case 'Real Time Metrics':
                this.#tabElements[1].style.display = 'block';
                break;
            case 'Logs':
                this.#tabElements[2].style.display = 'block';
                break;
            default:
                this.#tabElements[3].style.display = 'block';
                break;
        }
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