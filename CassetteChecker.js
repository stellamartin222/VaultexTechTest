class CassetteChecker {
    constructor(order, errorHandler, numberOfCassettes, cassetteCapacity){
        this.order = order;
        this.errorHandler = errorHandler;
        this.numberOfCassettes = numberOfCassettes;
        this.cassetteCapacity = cassetteCapacity;
        this.cassetteCounter = 0;
        this.orderLineChecker();
    }

    orderLineChecker() {
        for(let i = 0; i < this.order.length; i++){
            this.cassetteCounter += this.errorHandler.isCassetteValueValid(this.order[i], this.cassetteCapacity);
        }
        this.errorHandler.cassetteCounterCheck(this.numberOfCassettes, this.cassetteCounter);
        if(this.errorHandler.isValid === true){
            this.orderStatus = 'Complete'
            console.log(['valid', 'order valid, send for packing']);
        } else {
            console.log(this.errorHandler.errorMessage);
        }
    }

    
}

module.exports = CassetteChecker;