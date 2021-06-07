
const styles = `
.console-container {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 350px;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;
}

.tabs{
    background-color: aquamarine;
    display: flex;
    overflow: hidden;
    border-radius: 4px 0;
}

.tab{
    padding: 10px;
    cursor: pointer;
}

.consoles{
    display: flex;
    flex-direction: row;
    height: 100%;
    padding: 0;
    margin: 0;
    position: relative;
    background-color: yellowgreen;
}

.console{
    width: 100%;
    height: 100%;
    position: absolute;
    list-style: none;
    padding: 0;
    margin: 0;
    overflow-x: scroll;
}

.tab:nth-child(1){
    background-color: teal;
}

.console:nth-child(1){
    background-color: teal;
}

.tab:nth-child(2){
    background-color: tomato;
}

.console:nth-child(2){
    background-color: tomato;
}

.tab:nth-child(3){
    background-color:plum;
}

.console:nth-child(3){
    background-color: plum;
}

.tab:nth-child(4){
    background-color:indianred;
}

.console:nth-child(4){
    background-color:indianred;
}

.log-line{
    padding: 5px;
}

.log-line > span{
    margin-right: 15px;
}

.log-card{
    margin: 5px;
    padding: 5px;
    border: 1px solid lightgreen;
    border-radius: 10px;
    list-style: none;
    flex-grow: 1;
}

.log-card > li > span{
    margin: 0;
    padding: 0 10px;
    width: 80px;
    flex-grow: 1;
}

.log-card > li{
    display: flex;
    flex-direction: row;
}

.log-card > li > span:nth-child(1){
    background-color: lightgrey;
    text-transform: capitalize;
}

.log-card > li > span:nth-child(2){
    background-color: lightgreen;
}

ul#caracteristics {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: baseline;
    align-content: flex-start;
}
`;
class UI {

    #videoElement;
    #tabButtonElements;
    #tabElements;
    #caracteristicsElement;
    #realTimeMetricsElement;
    #errorElement;

    #consoleContainerEl;
    #tabHeadersHolderEl;
    #consolesHolderEl;


    constructor() {
        this.#videoElement = document.querySelector('#video');

        const tabNames = ['Caracteristics', 'Real Time Metrics', 'Logs', 'Error'];
        const tabContentIds = ['caracteristics', 'real-time-metrics', 'logs', 'error'];
        this.#consoleContainerEl = document.createElement('div');
        this.#consoleContainerEl.className = 'console-container';
        this.#tabHeadersHolderEl = document.createElement('div');
        this.#tabHeadersHolderEl.className = 'tabs';
        this.#consolesHolderEl = document.createElement('div');
        this.#consolesHolderEl.className = 'consoles';
        this.#consoleContainerEl.appendChild(this.#tabHeadersHolderEl);
        this.#consoleContainerEl.appendChild(this.#consolesHolderEl);

        for (const tabName of tabNames) {
            const tab = document.createElement('span');
            tab.className = 'tab';
            tab.innerText = tabName;
            this.#tabHeadersHolderEl.appendChild(tab);
        }

        for (const tabId of tabContentIds) {
            const tab = document.createElement('ul');
            tab.className = 'console';
            tab.id = tabId;
            this.#consolesHolderEl.appendChild(tab);
        }

        document.body.appendChild(this.#consoleContainerEl);

        const style = document.createElement('style');
        style.appendChild(document.createTextNode(styles));
        document.head.appendChild(style);


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