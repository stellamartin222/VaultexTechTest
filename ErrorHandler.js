

class ErrorHandler {
    constructor(order){
        this.isValid = true;
        this.errorMessage = ['Error'];
        this.orderLengthChecker(order);
        this.orderTypeChecker(order);
        this.orderLineChecker(order);
    }

    orderLengthChecker(order) {
        if(order.length > 5){
            this.isValid = false;
            this.errorMessage.push('Too many values given.');
        } else if (order.length < 1) {
            this.isValid = false;
            this.errorMessage.push('No values given.');
        }
    }

    orderTypeChecker(order) {
        if(typeof order != 'object'){
            this.isValid = false;
            this.errorMessage.push('Order must be given as an array.');
        }
    }

    orderLineChecker(order) {
        const notes = [
            "5",
            "10",
            "20",
            "50"
        ];
        let cassetteCounter = 0;

        for(let i= 0; i < order.length; i++){
            if(typeof order[i][0] != 'string' || typeof order[i][1] != 'number'){
                this.isValid = false;
                this.errorMessage.push('Each order line must be formatted as a string followed by a number.');
            }
            if(notes.includes(order[i][0])){
                //do nothing
            } else if(order[i][0] === 'cassettes'){
                cassetteCounter += 1;
            }else {
                this.isValid = false;
                this.errorMessage.push('The first item in the order line must be on of; 5, 10, 20, 50 or cassettes.');
            }
        }

        if(cassetteCounter > 1){
            this.isValid = false;
                this.errorMessage.push('Cannot order cassette more than once.');
        }
    }

    isCassetteValueValid(order, cassetteCapacity){
        if(order[1]/order[0] % cassetteCapacity === 0){
            //do nothing
        } else {
            this.isValid = false;
            this.errorMessage.push('Notes requested must fill a cassette.');
        }
        return (order[1]/order[0]) / cassetteCapacity;
    }

    cassetteCounterCheck(numberOfCassettes, cassetteCounter){
        if(numberOfCassettes != cassetteCounter){
            this.isValid = false;
            this.errorMessage.push('Number of Cassettes cannot be over 4 cassettes maximum and must equal the requested ammount.');
        }
    }
}

module.exports = ErrorHandler;