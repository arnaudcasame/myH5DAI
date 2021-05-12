

class UI {

    #videoElement;
    #tabButtonElements;
    #tabElements;
    #caracteristicsElement;
    #realTimeMetricsElement;
    #errorElement;

    constructor() {
        this.#videoElement = document.querySelector('#video');
        this.#caracteristicsElement = document.querySelector('#caracteristics');
        this.#realTimeMetricsElement = document.querySelector('#real-time-metrics');
        this.#errorElement = document.querySelector('#error');
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
        return this.#realTimeMetricsElement;
    }

    onTabButtonClicked(e){
        this.#tabElements.forEach((element, i) => {
            element.style.display = 'none';
        });
        switch (e.target.innerText) {
            case 'Caracteristics':
                this.#tabElements[0].style.display = 'flex';
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
        if(alertType && alertType === 1){
            this.#errorElement.appendChild(listItem);
        }else{
            this.#realTimeMetricsElement.appendChild(listItem);
        }
    }

    printMaster(data){
        const unOrderedList = document.createElement('ul');
        unOrderedList.className = 'log-card';
        for (const key in data) {
            if (typeof data[key] !== 'object') {
                const cardItem = document.createElement('li');
                const keyHolder = document.createElement('span');
                const valueHolder = document.createElement('span');
                keyHolder.innerText = key;
                valueHolder.innerText = data[key];
                cardItem.appendChild(keyHolder);
                cardItem.appendChild(valueHolder);
                unOrderedList.appendChild(cardItem);
            }
        }
        this.#caracteristicsElement.appendChild(unOrderedList);        
    }

    formatTime(){
        let logTime = new Date();
        logTime = logTime.toTimeString();
        return logTime.substring(0, logTime.indexOf('GMT') - 1);
    }
}